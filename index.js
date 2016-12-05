const fs = require('fs')
const Path = require('path')
const fromJson = require('ngraph.fromjson')
const Renderer = require('ngraph.pixel')
const Graph = require('./graph')

const config = {
  physics: {
    springLength : 80,
    springCoeff : 0.00005,
    gravity: -0.4,
    theta : 0.4,
    dragCoeff : 0.04
  },
  link: () => {
    return {
      fromColor: 0x000066,
      toColor: 0x000066
    }
  }
}

module.exports = function (sbot, cb) {
  Graph(sbot, (err, data) => {
    if (err) return cb(err)
    const str = JSON.stringify(data)
    const graph = fromJson(str)
    const display = Renderer(graph, config)
    cb(null, display)
  })
}
