const Renderer = require('ngraph.pixel')
const avatar = require('ssb-avatar')
const html = require('yo-yo')

module.exports = createRenderer

function createRenderer (graph, config, sbot) {
  var avatarEl = html`<div class="avatar" />`
  document.body.appendChild(avatarEl)

  var display = Renderer(graph, config)

  display.on('nodehover', handleNodeHover)

  return display

  function handleNodeHover (node) {
    if (node === undefined) return

    avatar(sbot, node.id, node.id, (err, { name, image }) => {
      // handle this error!
      if (err) throw err

      const imgSrc = image ? `http://localhost:7777/${image}` : ''

      const newAvatarEl = html`
        <div class="avatar">
          <img class="image" src=${imgSrc} />
          <div class="name">${name}</div>
        </div>
      `

      html.update(avatarEl, newAvatarEl)
    })

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
