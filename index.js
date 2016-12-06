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
    var display = Renderer(graph, config)

    display.on('nodehover', handleNodeHover)
    cb(null, display)


    function handleNodeHover (node) {
      if (node === undefined) return

      node.links
        .map(link => display.getLink(link.id))
        .forEach(linkUI => {
          let color = 0x80ffffff
          linkUI.fromColor = color
          linkUI.toColor = color
        })
    }
  })
}

