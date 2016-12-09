const http = require('http')
const Assets = require('bankai')
const { join } = require('path')
const fromJson = require('ngraph.fromjson')
const defaultsDeep = require('lodash/defaultsDeep')

const defaultVizConfig = require('./config')
const Api = require('./api')

var _server

module.exports = {
  name: 'ssb-graphviz',
  version: require('./package.json').version,
  manifest: {},
  init: function (ssb, config, reconnect) {
    // close existing server. when scuttlebot plugins get a deinit method, we
    // will close it in that instead it
    if (server) server.close()

    var server = Server(ssb, config, reconnect)
    _server = server
    server.listen()

    return {}
  }
}

function Server (ssb, config, reconnect) {
  const vizConfig = defaultsDeep(config['ssb-graphviz'], defaultVizConfig)
  const { host, port } = parseAddr(config.listenAddr, {
    host: vizConfig.host,
    port: vizConfig.port
  })

  var server = http.createServer(Api(ssb, config))

  return {
    listen,
    close
  }

  function listen () {
    server.listen(port, host, function () {
      var hostName = ~host.indexOf(':') ? '[' + host + ']' : host
      console.log(`Listening on http://${hostName}:${port}/`)
    })
  }

  function close () {
    server.close()
  }
}

function parseAddr(str, def) {
  if (!str) return def
  var i = str.lastIndexOf(':')
  if (~i) return {host: str.substr(0, i), port: str.substr(i+1)}
  if (isNaN(str)) return {host: str, port: def.port}
  return {host: def.host, port: str}
}
