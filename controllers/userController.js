const User = require('../models/user')

function getAllUsers (req, res) {
  User.find({}, function (err, usersArray) {
    if (err) return res.status(401).json({error: '/users getAllUsers error 1'})
    res.status(200).json(usersArray)
  })
}

module.exports = {
  getAllUsers: getAllUsers
}
