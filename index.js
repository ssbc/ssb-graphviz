const insertCss = require('insert-css')

const config = require('./config')
const Data = require('../data')
const Viz = require('../')

insertCss(`
  html, body, main {
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

Data((err, data) => {
  if (err) throw err
  Viz(data, config)
})
