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
function createArticle (req, res, next) {
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
        // Check for duplicates
        Topic.findOne({topic: label}, function (err, t) {
          if (err) return next(err)
          console.log('Finding..')
          if (!t) {
            console.log('Topic not found, creating new topic')
            var topic = new Topic({topic: label})
            topic.save((err, topic) => {
              if (err) return next(err)
              article.topics.push(topic)
            })
          }
          if (t) {
            console.log('Topic found')
            article.topics.push(t)
          }
        })
      })
    }
    if (data.media) console.log(JSON.stringify(data.media))

    // add tldr
    summary.summarize(article.url, {shortenFactor: 0.1, maxAnalyzedSentences: 2}, function (result, err) {
      if (err) return next(err)
      article.tldr = new Tldr({summary: result.summary})

      article.save((err, article) => {
        if (err) return next(err)
        Article.findOne(article).populate('topics').exec(function (err, article) {
          if (err) return next(err)
          res.status(200).json({article})
        })
      })
    })
  })
}

function getArticle (req, res, next) {
  var id = req.params.id

  Article.findById({_id: id}).populate('topics').exec(function (err, article) {
    if (err) return next(err)
    res.status(200).json({article})
  })
}

function updateArticle (req, res, next) {
  var id = req.params.id
  Article.findById({_id: id}, function (err, article) {
    if (err) return next(err)
    var topic = new Topic({topic: req.body.topics})
    topic.save((err, topic) => {
      if (err) return next(err)
      article.topics.push(topic)
      if (req.body.liked) article.liked = req.body.liked
      if (req.body.shared) article.shared = req.body.shared
      article.save(function (err) {
        if (err) return next(err)
        Article.findOne(article).populate('topics').exec(function (err, article) {
          if (err) return next(err)
          res.status(200).json({article})
        })
      })
    })
  })
}

function removeArticle (req, res, next) {
  var id = req.params.id

  Article.remove({_id: id}, (err) => {
    if (err) return next(err)

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
