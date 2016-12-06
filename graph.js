const pull = require('pull-stream')
const Sbot = require('ssb-client')
const waterfall = require('run-waterfall')

module.exports = Graph

function Graph (sbot, cb) {
  waterfall([
    (cb) => sbot.friends.all(cb),
    (friends, cb) => {
      cb(null, {
        nodes: Object.keys(friends).map(id => ({ id })),
        links: Object.keys(friends).reduce((sofar, friend) => {
          const friendOfFriends = Object.keys(friends[friend])
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
      })
    }
  ], cb)
}
