const Renderer = require('ngraph.pixel')
const h = require('hyperscript')
const avatar = require('ssb-avatar')
const Sbot = require('ssb-client')
const morph = require('morphdom')

module.exports = createRenderer

function createRenderer (graph, config, sbot) {
  var avatarEl = h('div#avatar')
  document.body.appendChild(avatarEl)

  var display = Renderer(graph, config)

  display.on('nodehover', handleNodeHover)

  return display

  function handleNodeHover (node) {
    if (node === undefined) return

    // TODO figure out why we have to start a fresh client.
    Sbot((err, sbot) => {
      avatar(sbot, node.id, node.id, (err, { name, image }) => {
        const imgSrc = image ? `http://localhost:7777/${image}` : ''

        var newAvatarEl = h('div#avatar', [
          h('img', { src: imgSrc }),
          h('div', name)
        ])

        morph(avatarEl, newAvatarEl)
        sbot.close()
      })
    })

    display.forEachLink(linkUI => {
      const { from, to } = linkUI
      const friends = node.data.friends

      const isFromTarget = node.id === from.id
      const isToTarget = node.id === to.id

      const isFromFriend = friends.indexOf(from.id) > -1
      const isToFriend = friends.indexOf(to.id) > -1
      const involvesFoaF = isFromFriend || isToTarget

      let fromColor = 0x000066
      let toColor = 0x000066

      const close = 0xffffff
      const mid = 0xa94caf
      const far = 0x000066

      if (isFromTarget) {
        fromColor = close
        toColor = mid
      }
      else if (isToTarget) {
        fromColor = mid
        toColor = close
      }
      else if (involvesFoaF && isFromFriend) {
        fromColor = mid
        toColor = far
      }
      else if (involvesFoaF && isToFriend) {
        fromColor = far
        toColor = mid
      }


      linkUI.fromColor = fromColor
      linkUI.toColor = toColor
    })

  }
}
