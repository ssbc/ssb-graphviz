const { assign } = Object
const Ngraph = require('ngraph.graph')
const Renderer = require('ngraph.pixel')
const html = require('inu/html')
const Widget = require('cache-element/widget')

const { focusNode } = require('./actions')

module.exports = GraphView

function GraphView (config) {
  var ngraph = Ngraph()
  var dispatch

  return Widget({
    render: function (graph, dispatch) {
      return html`<div class='graph'></div>`
    },
    onupdate: function (el, graph, _dispatch) {
      updateGraph(graph)
      dispatch = _dispatch
    },
    onload: initGraph
  })

  function updateGraph ({ nodes, links }) {
    ngraph.beginUpdate()
    ngraph.forEachLink(link => {
      ngraph.removeLink(link)
    })
    ngraph.forEachNode(node => {
      ngraph.removeNode(node)
    })
    nodes.forEach(node => {
      ngraph.addNode(node.id, node.data)
    })
    links.forEach(link => {
      ngraph.addLink(link.fromId, link.toId, link.data)
    })
    ngraph.endUpdate()
  }

  function initGraph (node) {
    const ngraphConfig = assign({ container: node }, config)
    var display = Renderer(ngraph, ngraphConfig)

    display.on('nodehover', handleNodeHover)

    function handleNodeHover (node) {
      if (node === undefined) return

      dispatch(focusProfile(node.id))

      display.forEachLink(linkUI => {
        const { from, to } = linkUI
        const friends = node.data.friends

        const isFromTarget = node.id === from.id
        const isToTarget = node.id === to.id

        const isFromFriend = friends.indexOf(from.id) > -1
        const isToFriend = friends.indexOf(to.id) > -1
        const involvesFoaF = isFromFriend || isToTarget

        var fromColor = 0x000066
        var toColor = 0x000066

        const close = 0xffffff
        const mid = 0xa94caf
        const far = 0x000066

        if (isFromTarget) {
          fromColor = close
          toColor = mid
        } else if (isToTarget) {
          fromColor = mid
          toColor = close
        } else if (involvesFoaF && isFromFriend) {
          fromColor = mid
          toColor = far
        } else if (involvesFoaF && isToFriend) {
          fromColor = far
          toColor = mid
        }

        linkUI.fromColor = fromColor
        linkUI.toColor = toColor
      })
    }
  }
}
