const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const articleController = require('../controllers/articleController')
const signInUpController = require('../controllers/signInUpController')
const tldrController = require('../controllers/tldrController')
const topicController = require('../controllers/topicController')

// 'HELLO WORLD' TEST FOR DEPLOYMENT ON HEROKU
router.get('/', function (req, res) {
  res.status(200).json({message: 'hello world!'})
})

// ROUTING END POINTS TO THE APPROPRIATE FUNCTIONS
router.post('/signup', signInUpController.signUp)
router.post('/signin', signInUpController.signIn)

// USERS
// Get all users
router.get('/users', userController.getAllUsers)

// ARTICLES
// Get all articles
router.get('/articles', articleController.getAllArticles)

// Create new article
router.post('/articles', articleController.createArticle)

// Get individual article
router.get('/articles/:id', articleController.getArticle)

// Delete article
router.delete('/articles/:id', articleController.removeArticle)

// TOPICS
// Get all topics
router.get('/topics', topicController.getAllTopics)

// Create new topic
router.post('/topics', topicController.createTopic)

// Get individual topic
router.get('/topics/:id', topicController.getTopic)

// Update topic
router.patch('/topics/:id', topicController.updateTopic)

// Delete topic
router.delete('/topics/:id', topicController.removeTopic)

router.post('/tldr', tldrController.createTldr)

router.post('/articles/:id/tldr', tldrController.generateTldr)

module.exports = router
