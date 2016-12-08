const insertCss = require('insert-css')
const Sbot = require('ssb-client')
const waterfall = require('run-waterfall')

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

  .avatar {
    position: fixed;
    left: 10px;
    bottom: 10px;
    color: #fff;
  }

  .avatar .image {
    max-height: 160px;
  }
`)

waterfall([Sbot, Viz], (err) => {
  if (err) throw err
})
