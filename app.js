// SETTING UP THE DEPENDENCIES FOR APP.JS
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const User = require('./models/user')
const Article = require('./models/article')
const userController = require('./controllers/userController')
const articleController = require('./controllers/articleController')
const signInUpController = require('./controllers/signInUpController')
const port = process.env.PORT || 3000

// CREATING THE APP
const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, User-Email, Auth-Token')
  next()
})
mongoose.connect('mongodb://default:defaultpassword@ds011890.mlab.com:11890/readr')

// SETTING UP THE ROOT TO SHOW ALL ARTICLES
app.get('/', articleController.getAllArticles)

// ROUTING END POINTS TO THE APPROPRIATE FUNCTIONS
app.post('/signup', signInUpController.signUp)
app.post('/signin', signInUpController.signIn)

// FIND USER BY ID
app.get('/users/:user_id', userController.findUserById)

// AFTER USER HAS LOGGED IN (Note: we need to include the middleware to check that user is logged in.)
// GET ALL POSTS SPECIFIC TO THE USER
app.get('/articles', userController.userLoggedIn, articleController.getAllArticles)

// CREATING ARTICLES
app.post('/articles', userController.userLoggedIn, articleController.createArticle)

// EDITING AND DELETING ARTICLES
// app.route('/articles/:id')
//   .put(userController.userLoggedIn, articleController.editArticle)
//   .delete(userController.userLoggedIn, articleController.deleteArticle)

// GET ALL USERS
app.get('/users', userController.getAllUsers)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
