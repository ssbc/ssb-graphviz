const waterfall = require('run-waterfall')

const { keys } = Object

module.exports = Graph

function Graph (sbot, cb) {
  waterfall([
    (cb) => sbot.friends.all(cb),
    (friends, cb) => {
      const filteredFriends = friends // activeFriends(friends)

      cb(null, {
        nodes: buildNodes(filteredFriends),
        links: buildLinks(filteredFriends)
      })
    }
  ], cb)
}

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

function buildLinks (friends) {
  return keys(friends).reduce((sofar, friend) => {
    const friendOfFriends = keys(friends[friend])
      .filter(id => friends[friend][id] === true)

    const edges = friendOfFriends.map(friendOfFriend => {
      return {
        fromId: friend,
        toId: friendOfFriend,
        data: {
          hidden: true
        }
      }
    })

    return [
      ...sofar,
      ...edges
    ]
  }, [])
}

/*
function activeFriends (friends) {
  return keys(friends)
    .reduce(
      (sofar, current) => {
        if (keys(friends[current]).length < 4) return sofar

        sofar[current] = friends[current]
        return sofar
      },
      {}
    )
}
*/
