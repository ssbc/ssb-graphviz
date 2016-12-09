const { assign } = Object
const { Domain } = require('inux')
const pull = require('pull-stream')
const async = require('pull-async')
const xhr = require('xhr')

const { SET_ONE, FETCH_ONE, setOne } = require('./actions')

module.exports = ProfilesApp

function ProfilesApp (config) {
  return Domain({
    name: 'profiles',
    init: () => ({
      model: {}
    }),
    update: {
      [SET_ONE]: (model, profile) => ({
        model: assign({}, model, { [profile.id]: profile })
      })
    },
    run: {
      [FETCH_ONE]: (profileId, sources) => {
        // don't fetch profile if already have it
        var hasProfile
        pull(
          sources.models(),
          pull.take(1),
          pull.drain(({ profiles }) => {
            hasProfile = !!profiles[profileId]
          })
        )
        if (hasProfile) return

        return async(cb => {
          xhr({
            url: `/api/profiles/${profileId}`,
            json: true
          }, (err, resp, { body } = {}) => {
            if (err) return cb(err)
            if (!body) return
            cb(null, setOne(body))
          })
        })
      }
    }
  })
}
