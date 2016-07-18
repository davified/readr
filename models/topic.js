const mongoose = require('mongoose')
const Article = require('./article')
const User = require('./user')


const TopicSchema = new mongoose.Schema({
  topic: String
})

const Topic = mongoose.model('Topic', TopicSchema)

module.exports = Topic
