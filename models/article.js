const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
  title: String,
  link: String,
  tldr: [],
  tags: [],
  score: Number
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
