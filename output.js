const insertCss = require('insert-css')
const Sbot = require('ssb-client')
const Viz = require('./')

insertCss(`
  html, body {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }

  #avatar {
    position: fixed;
    left: 10px;
    bottom: 10px;
    color: #fff;
  }

  #avatar img {
    max-height: 160px;
  }
`)
 
Sbot((err, sbot) => {
  Viz(sbot, (err, viz) => {
    if (err) throw err
    sbot.close()
  })
})
