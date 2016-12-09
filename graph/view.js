const { assign } = Object
const Renderer = require('ngraph.pixel')
const html = require('inu/html')
const { run } = require('inux')
const Widget = require('cache-element/widget')

const fromJson = require('ngraph.fromjson')

const { focus } = require('./actions')

module.exports = GraphView

function GraphView (config) {
  var ngraph
  var display

  return Widget({
    render: function (graph, dispatch) {
      return html`<div class='graph'></div>`
    },
    onupdate: function (el, graph, dispatch) {
      if (!display) {
        ngraph = fromJson(graph)
        display = Display(el)
        display.on('nodehover', NodeHoverHandler(dispatch))
      } else {
        // TODO a better way to update the graph
        // updateGraph(graph)
        // display.off('nodehover')
        // display.on('nodehover', NodeHoverHandler(dispatch))
      }
    }
  })

  /*
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
  */

  function Display (node) {
    const ngraphConfig = assign({ container: node }, config)
    return Renderer(ngraph, ngraphConfig)
  }

  function NodeHoverHandler (dispatch) {
    return (node) => {
      if (node === undefined) return

      dispatch(run(focus(node.id)))

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
