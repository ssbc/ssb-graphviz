const Renderer = require('ngraph.pixel')

module.exports = createRenderer

function createRenderer (graph, config) {
  var display = Renderer(graph, config)

  display.on('nodehover', handleNodeHover)

  return display

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
}
