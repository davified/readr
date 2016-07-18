const mongoose = require('mongoose')

const TopicSchema = new mongoose.Schema({
  topic: String
})

const Topic = mongoose.model('Topic', TopicSchema)

module.exports = Topic
