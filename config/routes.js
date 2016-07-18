const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const articleController = require('../controllers/articleController')
const signInUpController = require('../controllers/signInUpController')

// 'HELLO WORLD' TEST FOR DEPLOYMENT ON HEROKU
router.get('/', function (req, res) {
  res.status(200).json({message: 'hello world!'})
})

// ROUTING END POINTS TO THE APPROPRIATE FUNCTIONS
router.post('/signup', signInUpController.signUp)
router.post('/signin', signInUpController.signIn)

// GET ALL POSTS
router.get('/articles', articleController.getAllArticles)

// GET ALL USERS
router.get('/users', userController.getAllUsers)

module.exports = router
