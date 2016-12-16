const { keys } = Object

module.exports = buildNodes

function buildNodes (friends) {
  return keys(friends).map(id => {
    return {
      id,
      data: {
        friends: keys(friends[id])
      }
    }
  })
}

