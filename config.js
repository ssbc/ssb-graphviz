const config = {
  host: 'localhost',
  port: 7781,
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
  }
}

module.exports = config
