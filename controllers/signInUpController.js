const User = require('../models/user')

function signUp (req, res) {
  const user = new User(req.body)
  user.save((err, user) => {
    if (err) return res.status(401).json({error: '/signup error 1'})
    res.status(200).json({message: 'welcome! ', user})
  })
}

function signIn (req, res) {
  const userParams = req.body
  User.findOne({email: userParams.email}, (err, user) => {
    if (err || !user) return res.status(401).json({error: '/signin error 1'})
    user.authenticate(userParams.password, (err, isMatch) => {
      if (err) return res.status(401).json({err: '/signin error 2'})
      res.status(200).json({message: 'sign in success! welcome: ', user})
    })
  })
}

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

module.exports = {
  signUp: signUp,
  signIn: signIn,
  userLoggedIn: userLoggedIn
}
