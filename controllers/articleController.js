const Article = require('../models/article')

function getAllArticles (req, res) {
  Article.find({}, function (err, articlesArray) {
    if (err) return res.status(401).json({error: '/ getAllArticles error'})
    res.status(200).json(articlesArray)
  })
}

module.exports = {
  getAllArticles: getAllArticles
}
