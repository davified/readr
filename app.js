// SETTING UP THE DEPENDENCIES FOR APP.JS
const express = require('express')
const mongoose = require('mongoose')
const logger = require('morgan')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const dotenv = require('dotenv')
dotenv.load()

// CREATING THE APP
const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, User-Email, Auth-Token')
  res.header('Access-Control-Allow-Methods', 'POST,PATCH,GET')
  next()
})
mongoose.connect(process.env.MONGODB_URI)

// ROUTES
const router = require('./config/routes')
app.use('/', router)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
