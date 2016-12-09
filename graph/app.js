const xhr = require('xhr')
const { Domain } = require('inux')
const async = require('pull-async')
const html = require('inu/html')

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
          fetchProfile(id)
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
            ${profileView(focusedProfile, dispatch)}
            ${graphView(graph, dispatch)}
          </div>
        `
      }]
    ]
  })
}
