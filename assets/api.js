const { join } = require('path')
const pull = require('pull-stream')
const toPull = require('stream-to-pull-stream')
const Assets = require('bankai')

module.exports = AssetsApi

function AssetsApi (ssb, config) {
  const clientPath = join(__dirname, '../browser.js')
  const assets = Assets(clientPath)

  return (req, res, next) => {
    if (req.url === '/') {
      assets.html(req, res).pipe(res)
    } else if (req.url.substring(0, 7) === '/blobs/') {
      const id = req.url.substring(7)
      sendBlob(id, req, res)
    } else if (req.url === '/bundle.js') {
      assets.js(req, res).pipe(res)
    } else if (req.url === '/bundle.css') {
      assets.css(req, res).pipe(res)
    } else next()
  }

  function sendBlob (id, req, res) {
    pull(getBlob(id), toPull(res))
  }

  function getBlob (id) {
    return ssb.blobs.get(id)
  }
}
