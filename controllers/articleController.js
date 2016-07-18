const Article = require('../models/article')
const summary = require('node-tldr')

function getAllArticles (req, res) {
  Article.find({}, function (err, articlesArray) {
    if (err) return res.status(401).json({error: '/ getAllArticles error'})
    res.status(200).json(articlesArray)
  })
}

// need to figure out how to save embedded models (e.g. Tldr and Categories). Right now, it throws an error when tldr and categories are listed in articleman. But when I remove it, createArticle() works
function createArticle (req, res) {
  const article = new Article(req.body)
  article.save((err, article) => {
    if (err) return res.status(401).json({error: '/article createArticle error 1'})
    res.status(200).json({message: 'article created! yay! ', article})
  })
}

function generateTldr (req, res, next) {
  const url = req.body.url
  summary.summarize(url, function (result, failure) {
    if (failure) {
      return res.status(401).json({error: 'generateTldr error 1'})
    }
    // User.findOne({email: userEmail, auth_token: authToken}, (err, user) => {
    //   if (err || !user) return res.status(401).json({error: 'unauthorised'})
    //   req.currentUser = user
    //   next()

    // console.log(result);
    console.log(result.title)
    console.log(result.words)
    console.log(result.compressFactor)
    console.log(result.summary.join('\n'))
    next()
  })
}


module.exports = {
  getAllArticles: getAllArticles,
  createArticle: createArticle,
}
