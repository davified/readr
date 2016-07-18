const Article = require('../models/article')
<<<<<<< HEAD
var Diffbot = require('diffbot').Diffbot
var diffbot = new Diffbot('0b940b7bfec2c5da6ae73fc1225913dc') // Diffbot Token Here
=======
>>>>>>> generatetldr

function getAllArticles (req, res) {
  Article.find({}, (err, articlesArray) => {
    if (err) return res.status(401).json({error: '/ getAllArticles error'})
    res.status(200).json(articlesArray)
  })
}

// need to figure out how to save embedded models (e.g. Tldr and Categories). Right now, it throws an error when tldr and categories are listed in articleman. But when I remove it, createArticle() works
function createArticle (req, res) {
  let article = new Article()

  diffbot.article({url: req.body.url}, (err, data) => {
    if (err) res.json({message: 'Diffbot Error:' + err})

    article.url = data.objects[0].pageUrl
    article.title = data.objects[0].title
    article.html = data.objects[0].html
    // article.topics = data.objects[0].tags
    if (data.media) console.log(JSON.stringify(data.media))

    article.save((err, article) => {
      if (err) return res.status(401).json({error: '/article createArticle error 1'})
      res.status(200).json({message: 'article created! yay! ', article})
    })
  })
}

function getArticle (req, res) {
  var id = req.params.id

  Article.findById({_id: id}, (error, article) => {
    console.log('article')
    if (error) res.json({message: 'Could not find article b/c:' + error})

    res.json({article: article})
  })
}

<<<<<<< HEAD
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
  removeArticle: removeArticle
=======
module.exports = {
  getAllArticles: getAllArticles,
  createArticle: createArticle
>>>>>>> generatetldr
}
