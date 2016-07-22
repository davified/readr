const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const articleController = require('../controllers/articleController')
const signInUpController = require('../controllers/signInUpController')
const tldrController = require('../controllers/tldrController')
const topicController = require('../controllers/topicController')

// 'HELLO WORLD' TEST FOR DEPLOYMENT ON HEROKU
router.get('/', function (req, res) {
  res.status(200).json({user_signup_url: 'https://readr-app.herokuapp.com/sign_up/',
                        user_signin_url: 'https://readr-app.herokuapp.com/sign_in/',
                        show_all_users: 'https://readr-app.herokuapp.com/users',
                        show_all_articles: 'https://readr-app.herokuapp.com/articles/',
                        article_url: 'https://readr-app.herokuapp.com/articles/{id}',
                        show_all_topics: 'https://readr-app.herokuapp.com/topics',
                        topic_url: 'https://readr-app.herokuapp.com/topics/{id}',
                        search_url: 'https://readr-app.herokuapp.com/search/{topics}',
                        show_all_tldr: 'https://readr-app.herokuapp.com/articles/{id}/tldr',
                        show_tldr: 'https://readr-app.herokuapp.com/articles/{id}/tldr/{id}'
  })
})

// ROUTING END POINTS TO THE APPROPRIATE FUNCTIONS
router.post('/signup', signInUpController.signUp)
router.post('/signin', signInUpController.signIn)

// USERS
// Get all users
router.get('/users', userController.getAllUsers)
// router.get('/users/:id', userController.findUserById)

// ARTICLES
// Get all articles
router.get('/articles', articleController.getAllArticles)

// Create new article
router.post('/articles', articleController.createArticle)

// Get individual article
router.get('/articles/:id', articleController.getArticle)

// Update individual article
router.patch('/articles/:id', articleController.updateArticle)

// Delete article
router.delete('/articles/:id', articleController.removeArticle)

// TOPICS
// Get all topics
router.get('/topics', topicController.getAllTopics)

// Create new topic
router.post('/topics', userController.userLoggedIn, topicController.createTopic)

// Get individual topic and show all articles related to this topic
router.get('/topics/:name', topicController.getAllArticlesOfOneTopic)

// Update topic
router.patch('/topics/:id', userController.userLoggedIn, topicController.updateTopic)

// Delete topic
router.delete('/topics/:id', userController.userLoggedIn, topicController.removeTopic)

// TLDRs
// Create TLDR
router.post('/articles/:id/tldr', userController.userLoggedIn, tldrController.createTldr)
// Automatically generating TLDR. I've commented this out because the generateTldr() function is only used in the articleController when creating functions
// router.post('/articles/:id/tldr', userController.userLoggedIn, tldrController.generateTldr)

// Get TLDRs (all, and by id)
router.get('/articles/:id/tldr', tldrController.getAllTldr)
router.get('/articles/:id/tldr/:tldr_id', tldrController.getTldrById)

// Edit TLDR
router.patch('/articles/:id/tldr/:tldr_id', userController.userLoggedIn, tldrController.updateTldr)

// Delete TLDR
router.delete('/articles/:id/tldr/:tldr_id', userController.userLoggedIn, tldrController.removeTldr)

module.exports = router
