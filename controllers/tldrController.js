const Tldr = require('../models/article').Tldr
const summary = require('node-tldr')

function createTldr (req, res) {
  const tldr = new Tldr(req.body)
  tldr.save((err, article) => {
    if (err) return res.status(401).json({error: '/tldr createTldr error 1'})
    res.status(200).json({message: 'tldr saved', tldr})
  })
}

function generateTldr (req, res) {
  const articleId = req.params.id
  const url = req.body.url
  var tldr = new Tldr
  summary.summarize(url, function(result, failure) {
    if (failure) console.log("An error occured! ")
    tldr = new Tldr({summary: result.summary})
    tldr.save((err, article) => {
      if (err) return res.status(401).json({error: '/tldr createTldr error 1'})
      res.status(200).json({message: 'autogenerated tldr saved', tldr})
    })
  })
}

module.exports = {
  createTldr: createTldr,
  generateTldr: generateTldr
}
