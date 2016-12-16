const { join } = require('path')
const pull = require('pull-stream')
const toPull = require('stream-to-pull-stream')
const Assets = require('bankai')
const Routes = require('http-routes')

module.exports = AssetsApi

function AssetsApi (ssb, config) {
  const clientPath = join(__dirname, '../browser.js')
  const assets = Assets(clientPath)

  return Routes([
    ['/', (req, res, next) => {
      assets.html(req, res).pipe(res)
    }],
    ['/bundle.js', (req, res, next) => {
      assets.js(req, res).pipe(res)
    }],
    ['/bundle.css', (req, res, next) => {
      assets.css(req, res).pipe(res)
    }],
    ['/blobs/:blobId(.*)', {
      get: (req, res, next) => {
        sendBlob(req.params.blobId, req, res)
      }
    }]
  ])

  function sendBlob (id, req, res) {
    pull(getBlob(id), toPull(res))
  }

  function getBlob (id) {
    return ssb.blobs.get(id)
  }
}
