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
  images: Array,
  tldr: [TldrSchema],
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  score: Number,
  liked: Number,
  shared: Number,
  created_at: Date,
  updated_at: Date
})

ArticleSchema.pre('save', function (next) {
  let now = new Date()
  this.updated_at = now
  if (!this.created_at) {
    this.created_at = now
  }
  next()
})

const Article = mongoose.model('Article', ArticleSchema)
const Tldr = mongoose.model('Tldr', TldrSchema)

module.exports = {
  Article: Article,
  Tldr: Tldr
}
