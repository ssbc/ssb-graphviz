const pull = require('pull-stream')
const Sbot = require('ssb-client')
const avatar = require('ssb-avatar')
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

function buildNodes(friends) {
  return keys(friends).map(id => ({ id }) )
}

function buildLinks(friends) {
  return keys(friends).reduce((sofar, friend) => {
    const friendOfFriends = keys(friends[friend])
      .filter(id => friends[friend][id] === true)
      // .filter(id => keys(friends).indexOf(id) > -1)

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

