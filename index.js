const fs = require('fs')
const Path = require('path')
const fromJson = require('ngraph.fromjson')
const Renderer = require('ngraph.pixel')
const Graph = require('./graph')
const avatar = require('ssb-avatar')

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
    var display = Renderer(graph, config)

    display.on('nodehover', handleNodeHover)
    cb(null, display)

    function handleNodeHover (node) {
      if (node === undefined) return
      // avatar(sbot, node.id, node.id, (err, data) => console.log(err, data))

      display.forEachLink(linkUI => {
        const { from, to } = linkUI
        const friends = node.data.friends

        const involvesFoaF = friends.indexOf(from.id) > -1 || friends.indexOf(to.id) > -1
        const isFromTarget = node.id === from.id
        const isToTarget = node.id === to.id

        let fromColor = 0x000066
        let toColor = 0x000066

        if (involvesFoaF) {
          fromColor = 0xeeeeee
          toColor = 0xeeeeee
        } else if (isFromTarget) {
          fromColor = 0x00ff00
        } else if (isToTarget) {
          toColor = 0xff0000
        }

        linkUI.fromColor = fromColor
        linkUI.toColor = toColor
      })


    }
  })
}

