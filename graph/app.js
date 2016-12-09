const { assign } = Object
const xhr = require('xhr')
const { Domain, run } = require('inux')
const async = require('pull-async')
const html = require('inu/html')
const pull = require('pull-stream')

const { SET, SET_FOCUS, FETCH, FOCUS, set, setFocus, fetch } = require('./actions')
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
      [SET_FOCUS]: (model, focus) => ({
        model: assign({}, model, { focus })
      })
    },
    run: {
      [FETCH]: () => {
        return async(cb => {
          xhr({
            url: '/api/graph',
            json: true
          }, (err, resp, { body } = {}) => {
            if (err) return cb(err)
            cb(null, set(body))
          })
        })
      },
      [FOCUS]: (id) => {
        return pull.values([
          setFocus(id),
          run(fetchProfile(id))
        ])
      }
    },
    routes: [
      ['/', (params, model, dispatch) => {
        const { graph, profiles } = model
        const { focus } = graph
        const focusedProfile = focus ? profiles[focus] : undefined

        return html`
          <div class='main'>
            ${graphView(graph, dispatch)}
            ${profileView(focusedProfile, dispatch)}
          </div>
        `
      }]
    ]
  })
}
