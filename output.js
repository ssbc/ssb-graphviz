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
`)
 
Sbot((err, sbot) => {
  Viz(sbot, (err, viz) => {
    if (err) throw err
    sbot.close()
  })
})
