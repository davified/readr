const User = require('../models/user')

function userLoggedIn (req, res, next) {
  const userEmail = req.get('User-Email')
  const authToken = req.get('Auth-Token')
  if (!userEmail || !authToken) return res.status(401).json({error: 'unauthorised'})

  User.findOne({email: userEmail, auth_token: authToken}, (err, user) => {
    if (err || !user) return res.status(401).json({error: 'unauthorised'})
    req.currentUser = user
    next()
  })
}

function getAllUsers (req, res) {
  User.find({}, function (err, usersArray) {
    if (err) return res.status(401).json({error: '/users getAllUsers error 1'})
    res.status(200).json(usersArray)
  })
}

function findUserById (req, res) {
  User.findById({_id: req.params.id}, function (err, user) {
    if (err) return res.status(401).json({error: '/users getAllUsers error 1'})
    res.status(200).json(user)
  })
}

module.exports = {
  getAllUsers: getAllUsers,
  findUserById: findUserById,
  userLoggedIn: userLoggedIn
}
