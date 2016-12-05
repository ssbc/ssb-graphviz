module.exports = profile

module.exports = function (sbot, id, cb) {
  pull(
    sbot.(id, (err, profile) => {
      if (err) return cb(err)
      console.log('profile', profile)
    }),
    pull.reduce(latest, {})
  )
}

function latest (sofar, next) {
  console.log('sofar', sofar, next)
  return sofar
}
