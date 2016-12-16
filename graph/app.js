const { assign } = Object
const xhr = require('xhr')
const { Domain, run } = require('inux')
const pullContinuable = require('pull-cont')
const html = require('inu/html')
const pull = require('pull-stream')

const { SET, SET_HOVER, FETCH, HOVER, set, setHover, fetch } = require('./actions')
const GraphView = require('./view')
const { fetchOne: fetchProfile } = require('../profiles/actions')
const ProfileView = require('../profiles/view')

module.exports = GraphApp

function GraphApp (config) {
  const graphView = GraphView(config)
  const profileView = ProfileView(config)

  return Domain({
    name: 'graph',
    init: () => ({
      model: {
        nodes: [],
        links: []
      },
      effect: fetch()
    }),
    update: {
      [SET]: (model, graph) => ({ model: graph }),
      [SET_HOVER]: (model, hover) => ({
        model: assign({}, model, { hover })
      })
    },
    run: {
      [FETCH]: () => {
        return pullContinuable(cb => {
          xhr({
            url: '/api/graph',
            json: true
          }, (err, resp, { body } = {}) => {
            if (err) return cb(err)
            cb(null, pull.values([set(body)]))
          })
        })
      },
      [HOVER]: (id) => {
        return pull.values([
          setHover(id),
          run(fetchProfile(id))
        ])
      }
    },
    routes: [
      ['/', (params, model, dispatch) => {
        const { graph, profiles } = model
        const { hover } = graph
        const hoveredProfile = hover ? profiles[hover] : undefined

        return html`
          <div class='main'>
            ${graphView(graph, dispatch)}
            ${profileView(hoveredProfile, dispatch)}
          </div>
        `
      }]
    ]
  })
}
