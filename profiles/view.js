const html = require('inu/html')
const css = require('sheetify')

module.exports = ProfileView

css`
  .avatar {
    position: fixed;
    left: 10px;
    bottom: 10px;
    color: #fff;
  }

  .avatar .image {
    max-height: 160px;
  }
`

function ProfileView (config) {
  return (profile, dispatch) => {
    if (profile === undefined) return
    const { name, image } = profile

    return html`
      <div class="profile">
        <img class="image" src=${image} />
        <div class="name">${name}</div>
      </div>
    `
  }
}
