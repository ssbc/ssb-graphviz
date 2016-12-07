const Renderer = require('ngraph.pixel')

module.exports = createRenderer

function createRenderer (graph, config) {
  var display = Renderer(graph, config)

  display.on('nodehover', handleNodeHover)

  return display

  function handleNodeHover (node) {
    if (node === undefined) return

    node.links
      .map(link => display.getLink(link.id))
      .forEach(linkUI => {
        const color = 0x80ffffff
        linkUI.fromColor = color
        linkUI.toColor = color
      })
  }
}
