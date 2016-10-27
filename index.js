const fs = require('fs')
const Path = require('path')
const fromJson = require('ngraph.fromjson')
const Renderer = require('ngraph.pixel')
const Graph = require('./graph')

module.exports = function (sbot, cb) {
  Graph(sbot, (err, data) => {
    if (err) return cb(err)
    const str = JSON.stringify(data)
    const graph = fromJson(str)
    const display = Renderer(graph)
    cb(null, display)
  })
}
