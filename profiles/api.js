const Avatar = require('ssb-avatar')
const sendJson = require('send-data/json')
const sendError = require('send-data/error')
const Routes = require('http-routes')

module.exports = ProfilesApi

function ProfilesApi (ssb, config) {
  return Routes([
    ['/api/profiles/:profileId(.*)', {
      get: (req, res, next) => {
        sendProfile(req.params.profileId, req, res)
      }
    }]
  ])

  function sendProfile (id, req, res) {
    getProfile(id, (err, profile) => {
      if (err) {
        sendError(req, res, { body: err })
      } else {
        sendJson(req, res, { body: profile })
      }
    })
  }

  function getProfile (id, cb) {
    Avatar(ssb, id, id, (err, { name, image } = {}) => {
      if (err) return cb(err)
      const imgSrc = image ? `/blobs/${image}` : null
      cb(null, { id, name, image: imgSrc })
    })
  }
}
