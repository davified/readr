const Topic = require('../models/topic')

function getAllTopics (req, res) {
  Topic.find({}, function (err, topicsArray) {
    if (err) return res.status(401).json({error: '/ getAllTopics error'})
    res.status(200).json(topicsArray)
  })
}

function createTopic (req, res) {
  const topic = new Topic(req.body)
  topic.save((err, topic) => {
    if (err) return res.status(401).json({error: '/topic createTopic error 1'})
    res.status(200).json({message: 'topic created! yay! ', topic})
  })
}

function getTopic (req, res) {
  Topic.findById({_id: req.params.id}, function (err, topic) {
    if (err) return res.status(404).json({error: '/topic getTopic error 1'})
    res.status(200).json(topic)
  })
}

function updateTopic (req, res) {
  Topic.findById({_id: req.params.id}, function (err, topic) {
    if (err) return res.status(401).json({error: '/topic cant find topic to update'})
    topic.topic = req.body.topic
    topic.save(function (err) {
      if (err) return res.status(401).json({error: '/topic cant find topic to update'})
      res.status(200).json({message: 'topic updated! yay! ', topic})
    })
  })
}

function removeTopic (req, res) {
  Topic.findById({_id: req.params.id}, function (err, topic) {
    if (err) return res.status(401).json({error: '/topic cant find topic to delete'})
    topic.remove(function (err) {
      if (err) return res.status(401).json({error: '/topic cant delete topic'})
      res.status(200).json({message: 'topic deleted! Yay!'})
    })
  })
}

module.exports = {
  getAllTopics: getAllTopics,
  createTopic: createTopic,
  getTopic: getTopic,
  updateTopic: updateTopic,
  removeTopic: removeTopic
}
