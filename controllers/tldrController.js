const Tldr = require('../models/article').Tldr

function createTLDR (req, res) {
  const tldr = new Tldr(req.body)
  tldr.save((err, article) => {
    if (err) return res.status(401).json({error: '/tldr createTldr error 1'})
    res.status(200).json({message: 'tldr saved', tldr})
  })
}

module.exports = {
  createTLDR: createTLDR
}
