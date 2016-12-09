const Avatar = require('ssb-avatar')
const sendJson = require('send-data/json')
const sendError = require('send-data/error')

module.exports = ProfilesApi

function ProfilesApi (ssb, config) {
  return (req, res, next) => {
    if (req.url.substring(0, 15) === '/api/profiles/') {
      const id = req.url.substring(16)
      sendProfile(id, req, res)
    } else next()
  }

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
      const imgSrc = image ? `/images/${image}` : ''
      cb(null, { id, name, image })
    })
  }
}
