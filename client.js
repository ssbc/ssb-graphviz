const xhr = require('xhr')
const inu = 

module.exports = {
  graph: () {
    
  }
}
    Graph(ssb, (err, data) => {
      if (err) return cb(err)
      const str = JSON.stringify(data)
      var graph = fromJson(str)
      var display = Renderer(graph, config, sbot)

      cb(null, display)
    })

