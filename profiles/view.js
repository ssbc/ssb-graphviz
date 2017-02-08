const html = require('inu/html')
const css = require('sheetify')

module.exports = ProfileView

css`
  .profile {
    position: fixed;
    left: 10px;
    bottom: 10px;
    color: #222;
    font-size: 40px;
  }

  .profile .image {
    max-height: 160px;
  }
`

function ProfileView (config) {
  return (profile = {}, dispatch) => {
    const { name, image } = profile

    return html`
      <div id='profile' class='profile'>
        ${image && html`<img class='image' src=${image} />`}
        <div class='name'>${name}</div>
      </div>
    `
  }
}
