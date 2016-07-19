const Topic = require('../models/topic')
const Article = require('../models/article').Article

function getAllTopics (req, res) {
  Topic.find({}, function (err, topicsArray) {
    if (err) return res.status(401).json({error: '/topics getAllTopics() error'})
    res.status(200).json(topicsArray)
  })
}

function createTopic (req, res) {
  const topic = new Topic(req.body)
  topic.save((err, topic) => {
    if (err) return res.status(401).json({error: '/topics createTopic() error 1'})
    res.status(200).json({message: 'topic created! yay! ', topic})
  })
}

function getTopic (req, res) {
  Topic.findById({_id: req.params.id}, function (err, topic) {
    if (err) return res.status(404).json({error: '/topics getTopic() error 1'})
    res.status(200).json(topic)
  })
}

function updateTopic (req, res) {
  Topic.findById({_id: req.params.id}, function (err, topic) {
    if (err) return res.status(401).json({error: '/topics updateTopic() error. cant find topic to update'})
    topic.topic = req.body.topic
    topic.save(function (err) {
      if (err) return res.status(401).json({error: '/topics updateTopic() error. cant find topic to update'})
      res.status(200).json({message: 'topic updated! yay! ', topic})
    })
  })
}

function removeTopic (req, res) {
  Topic.findById({_id: req.params.id}, function (err, topic) {
    if (err) return res.status(401).json({error: '/topics removeTopic() error. cant find topic to remove'})
    topic.remove(function (err) {
      if (err) return res.status(401).json({error: '/topics removeTopic() error. cant remove topic'})
      res.status(200).json({message: 'topic removed! Yay!'})
    })
  })
}

function getAllArticlesOfOneTopic (req, res) {
  const topicName = req.params.name
  Topic.findOne({topic: topicName}, function (err, topic) {
    if (err || !topic) return res.status(404).json({error: '/topics getAllArticlesOfOneTopic() error 1'})
    Article
      .find({topics: topic.id}, function (err, articlesArray) {
        if (err) return res.status(404).json({error: '/topics getAllArticlesOfOneTopic() error 2'})
        res.status(200).json(articlesArray)
      })
  })
}

module.exports = {
  getAllTopics: getAllTopics,
  createTopic: createTopic,
  getTopic: getTopic,
  updateTopic: updateTopic,
  removeTopic: removeTopic,
  getAllArticlesOfOneTopic: getAllArticlesOfOneTopic
}
