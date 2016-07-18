// SETTING UP THE DEPENDENCIES FOR APP.JS
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
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

// ROUTES
const router = require('./config/routes')
app.use('/', router)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
