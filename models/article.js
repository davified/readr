const mongoose = require('mongoose')
const User = require('./user')

const TldrSchema = new mongoose.Schema({
  summary: String
})

const TopicSchema = new mongoose.Schema({
  topic: String
})

const ArticleSchema = new mongoose.Schema({
  url: String,
  title: String,
  html: [],
  tldr: [TldrSchema],
  topics: [TopicSchema],
  score: Number,
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  sharedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

// GENERATE TLDR SUMMARY BEFORE SAVE
ArticleSchema.pre('save', function (next) {
  const article = this
  // The node-tldr npm package should be called here, to automatically generate tldrs before user saves
})

const Article = mongoose.model('Article', ArticleSchema)
// const Tldr = mongoose.model('Tldr', TldrSchema)
// const Topic = mongoose.model('Topic', TopicSchema)

module.exports = Article
