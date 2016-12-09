const css = require('sheetify')
const { start, html, pull } = require('inu')
const log = require('inu-log')

const config = require('./config')
const App = require('./app')

css`
  html, body, .main, .graph {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    padding: 0;
    margin: 0;
  }
`

var app = App(config)
if (process.env.NODE_ENV !== 'production') {
  app = log(app)
}
const { views, models } = start(app)
const main = document.createElement('div')
main.className = 'main'
document.body.appendChild(main)

pull(
  views(),
  pull.drain(view => {
    html.update(main, view)
  })
)
