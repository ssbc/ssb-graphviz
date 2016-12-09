const defined = require('defined')

const config = {
  physics: {
    springLength: 80,
    springCoeff: 0.0001,
    gravity: -1.4,
    theta: 0.4,
    dragCoeff: 0.04
  },
  link: (link) => {
    // if (link.data.hidden) return
    // makes linkUI element not exist ? => display.getLink doesn't work

    return {
      fromColor: 0x000066,
      toColor: 0x000066
    }
  },
  container: document.body.querySelector('main'),
  blobsUrl: defined(
    process.env.BLOBS_URL,
    'http://localhost:7777/'
  )
}

module.exports = config
