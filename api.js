const Stack = require('stack')

module.exports = VizApi

function VizApi (ssb, config) {
  return Stack(...[
    require('./graph/api')(ssb, config),
    require('./profiles/api')(ssb, config),
    require('./assets/api')(ssb, config)
  ])
}
