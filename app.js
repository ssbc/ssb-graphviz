const { App } = require('inux')

module.exports = VizApp

function VizApp (config) {
  return App([
    require('./graph/app')(config)
  ])
}
