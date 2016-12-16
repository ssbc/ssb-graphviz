const Stack = require('stack')

module.exports = VizApi

function VizApi (ssb, config) {
  return Stack(...[
    require('./graph/api'),
    require('./profiles/api'),
    require('./assets/api')
  ].map(m => m(ssb, config)))
}
