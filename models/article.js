const mongoose = require('mongoose')
const Topic = require('./topic')

const TldrSchema = new mongoose.Schema({
  summary: String,
  likes: Number
})

const ArticleSchema = new mongoose.Schema({
  url: String,
  title: String,
  html: String,
  tldr: [TldrSchema],
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  score: Number,
  liked: Number,
  shared: Number
})

// GENERATE TLDR SUMMARY BEFORE SAVE
ArticleSchema.pre('save', function (next) {
  const article = this
  // The node-tldr npm package should be called here, to automatically generate tldrs before user saves
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
