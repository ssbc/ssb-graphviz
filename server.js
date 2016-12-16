#!/bin/sh
':' // ; exec "$(command -v node || command -v nodejs)" "$0" "$@"
// http://unix.stackexchange.com/questions/65235/universal-node-js-shebang
// vi: ft=javascript

const appName = process.env.appName
const config = require('ssb-config/inject')(appName)
const ssbClient = require('ssb-client')
const keys = require('ssb-keys')
  .loadOrCreateSync(require('path').join(config.path, 'secret'))
const Viz = require('.')

config.listenAddr = config._[1]
config.appName = appName

require('ssb-reconnect')(function (cb) {
  ssbClient(keys, config, cb)
}, function (err, ssb, reconnect) {
  if (err) throw err
  Viz.init(ssb, config, reconnect)
})
