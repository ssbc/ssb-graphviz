const { keys } = Object

module.exports = buildLinks

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
