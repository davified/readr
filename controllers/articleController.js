const Article = require('../models/article').Article
const Tldr = require('../models/article').Tldr
const Topic = require('../models/topic')
const summary = require('node-tldr')
var Diffbot = require('diffbot').Diffbot
var diffbot = new Diffbot('5f490e8f0bbb76d6edaed72a3a3b9898') // Diffbot Token Here

function checkDuplicates (x, article, next, callback) {
  if (!x) return callback(article)
  Topic.findOne({topic: x}, function (err, t) {
    if (err) return next(err)
    console.log('Finding..')
    if (!t) {
      console.log('Topic not found, creating new topic')
      var topic = new Topic({topic: x})
      topic.save((err, topic) => {
        if (err) return next(err)
        article.topics.push(topic)
        if (typeof callback === 'function') callback(article)
      })
    } else {
      console.log('Topic found')
      article.topics.push(t)
      if (typeof callback === 'function') callback(article)
    }
  })
}

function getAllArticles (req, res, next) {
  if (req.query.search) {
    Article.find({html: new RegExp(req.query.search, 'i')}).populate('topics').exec(function (err, articles) {
      if (err) return next(err)
      res.status(200).json({articles})
    })
  } else {
    Article.find({}).populate('topics').exec(function (err, articles) {
      if (err) return next(err)
      res.status(200).json({articles})
    })
  }
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
        checkDuplicates(label, article, next)
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
    checkDuplicates(req.body.topics, article, next, function (newArticle) {
      console.log('new', newArticle.topics.length)
      if (req.body.tldr) newArticle.tldr.push(new Tldr({summary: req.body.tldr}))
      if (req.body.liked) newArticle.liked = req.body.liked
      if (req.body.shared) newArticle.shared = req.body.shared
      newArticle.save(function (err) {
        if (err) return next(err)
        Article.findOne(newArticle._id).populate('topics').exec(function (err, article) {
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
