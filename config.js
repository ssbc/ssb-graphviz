const config = {
  host: 'localhost',
  port: 7781,
  physics: {
    springLength: 80,
    springCoeff: 0.0001,
    gravity: -0.2,
    theta: 0.4,
    dragCoeff: 0.04
  },
  link: (link) => {
    // if (link.data.hidden) return
    // makes linkUI element not exist ? => display.getLink doesn't work

    return {
      fromColor: 0xffffff,
      toColor: 0xffffff,
      width: '10px'
    }
  },
  clearColor: 0xffffff
}

module.exports = config
