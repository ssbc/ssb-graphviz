const { assign } = Object
const async = require('pull-async')

const { SET_ONE, FETCH_ONE, setOne } = require('./actions')

module.exports = ProfilesApp

function ProfilesApp (config) {
  return {
    init: () => ({
      model: {},
    }),
    update: {
      [SET_ONE]: (model, profile) => ({
        model: assign({}, model, { [profile.id]: profile })
      })
    },
    run: {
      [FETCH_ONE]: (id) => {
        return async(cb => {
          xhr({
            url: `/api/profiles/${profile}`,
            json: true
          }, (err, resp, { body } = {}) => {
            if (err) return cb(err)
            cb(null, setOne(body))
          })
        })
      },
    }
  }
}
