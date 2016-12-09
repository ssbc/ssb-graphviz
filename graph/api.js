const waterfall = require('run-waterfall')
const sendJson = require('send-data/json')
const sendError = require('send-data/error')

const buildLinks = require('./helpers/build-links')
const buildNodes = require('./helpers/build-nodes')

module.exports = GraphApi

function GraphApi (ssb, config) {
  return (req, res, next) => {
    switch (req.url) {
      case '/api/graph':
        sendGraph(req, res)
        break;
      default:
        next()
    }
  }

  function sendGraph (req, res) {
    getGraph((err, graph) => {
      if (err) {
        sendError(req, res, { body: err })
      } else {
        sendJson(req, res, { body: graph })
      }
    })
  }

  function getGraph (cb) {
    waterfall([
      ssb.friends.all,
      (friends, cb) => {
        cb(null, {
          nodes: buildNodes(friends),
          links: buildLinks(friends)
        })
      }
    ], cb)
  }
}
