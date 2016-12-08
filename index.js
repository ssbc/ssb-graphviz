const fs = require('fs')
const Path = require('path')
const fromJson = require('ngraph.fromjson')
const Renderer = require('./renderer')
const Graph = require('./graph')

const config = {
  physics: {
    springLength : 80,
    springCoeff : 0.0001,
    gravity: -1.4,
    theta : 0.4,
    dragCoeff : 0.04
  },
  link: (link) => {
    // if (link.data.hidden) return
    // makes linkUI element not exist ? => display.getLink doesn't work

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
    var graph = fromJson(str)
    var display = Renderer(graph, config, sbot)

    cb(null, display)
  })
}

