// SETTING UP THE DEPENDENCIES FOR APP.JS
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const User = require('./models/user')
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

// 'HELLO WORLD' TEST FOR DEPLOYMENT ON HEROKU
app.get('/', function (req, res) {
  res.status(200).json({message: 'hello world!'})
})

// ROUTING END POINTS TO THE APPROPRIATE FUNCTIONS
app.post('/signup', signInUpController.signUp)
app.post('/signin', signInUpController.signIn)

// GET ALL POSTS
app.get('/articles', articleController.getAllArticles)

// GET ALL USERS
app.get('/users', userController.getAllUsers)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
