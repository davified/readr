const Article = require('../models/article').Article
const Tldr = require('../models/article').Tldr
const Topic = require('../models/topic')
const summary = require('node-tldr')
var Diffbot = require('diffbot').Diffbot
var diffbot = new Diffbot('0b940b7bfec2c5da6ae73fc1225913dc') // Diffbot Token Here

function getAllArticles (req, res) {
  Article.find({}).populate('topics').exec(function (err, articles) {
    if (err) return res.status(401).json({error: '/article createArticle error 1'})
    res.status(200).json({articles})
  })
}

// need to figure out how to save embedded models (e.g. Tldr and Categories). Right now, it throws an error when tldr and categories are listed in articleman. But when I remove it, createArticle() works
function createArticle (req, res) {
  let article = new Article()
  article.score = 0
  article.liked = 0
  article.shared = 0

  diffbot.article({url: req.body.url}, (err, data) => {
    if (err) res.json({message: 'Diffbot Error:' + err})

    article.url = data.objects[0].pageUrl
    article.title = data.objects[0].title
    article.html = data.objects[0].html
    data.objects[0].images.forEach(function (img) {
      article.images.push(img.url)
    })
    if (data.objects[0].tags) {
      data.objects[0].tags.forEach(function (tag) {
        var label = tag.label.toLowerCase()
        var topic = new Topic({topic: label})
        topic.save((err, topic) => {
          if (err) return res.status(401).json({error: '/topic createTopic error 1'})
          article.topics.push(topic)
        })
      })
    }
    if (data.media) console.log(JSON.stringify(data.media))

    // add tldr
    summary.summarize(article.url, {shortenFactor: 0.1, maxAnalyzedSentences: 2}, function (result, failure) {
      if (failure) console.log('An error occured!')
      article.tldr = new Tldr({summary: result.summary})

      article.save((err, article) => {
        if (err) return res.status(401).json({error: '/article createArticle error 1'})
        Article.findOne(article).populate('topics').exec(function (err, article) {
          if (err) return res.status(401).json({error: '/article createArticle error 1'})
          res.status(200).json({article})
        })
      })
    })
  })
}

function getArticle (req, res) {
  var id = req.params.id

  Article.findById({_id: id}).populate('topics').exec(function (err, article) {
    if (err) return res.status(401).json({error: '/article createArticle error 1'})
    res.status(200).json({article})
  })
}

function updateArticle (req, res) {
  var id = req.params.id
  Article.findById({_id: id}, function (err, article) {
    if (err) return res.status(401).json({error: '/article updateArticle() error. cant find article to update'})
    article.liked = req.body.liked
    article.save(function (err) {
      if (err) return res.status(401).json({error: '/article updateArticle() error. cant find article to update'})
      res.status(200).json({message: 'article updated! yay! ', article})
    })
  })
}

function removeArticle (req, res) {
  var id = req.params.id

  Article.remove({_id: id}, (error) => {
    if (error) res.json({message: 'Could not delete article b/c:' + error})

    res.json({message: 'Article successfully deleted'})
  })
}

module.exports = {
  getAllArticles: getAllArticles,
  createArticle: createArticle,
  getArticle: getArticle,
  updateArticle: updateArticle,
  removeArticle: removeArticle
}
