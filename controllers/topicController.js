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
    if (err || !topic) return res.status(404).json({error: '/topics/:name getAllArticlesOfOneTopic() error 1'})
    Article
      .find({topics: topic.id}, function (err, articlesArray) {
        if (err) return res.status(404).json({error: '/topics/:name getAllArticlesOfOneTopic() error 2'})
        res.status(200).json(articlesArray)
      })
  })
}

// creating a function to get all articles of all topics. it NEEDS to return an array of articles.
function getAllArticlesOfAllTopics (req, res) {
  const articlesByTopicArray = []
  Topic.find({}, function (err, topicsArray) {
    if (err) return res.status(401).json({error: '/topics getAllArticlesOfAllTopics() error 1'})
    topicsArray.forEach(function (topic) {
      Article
        .find({topics: topic}, function (err, articlesArray) {
          if (err) return res.status(404).json({error: '/topics/:name getAllArticlesOfOneTopic() error 2'})
          articlesArray.forEach(function (article) {
            articlesByTopicArray.push(article)
          // console.log(article)
          })
        // console.log(articlesByTopicArray)
        })
    })
  })
  res.status(200).json(articlesByTopicArray) // why am i not able to get articlesByTopicArray on chrome? I can see it in the console..
}

function findByQuery (req, res) {
  var query = req.query
  db.collection('artists', function (err, collection) {
    collection.find(query).toArray(function (err, docs) {
      res.send(docs)
    })
  })
}

module.exports = {
  getAllTopics: getAllTopics,
  createTopic: createTopic,
  getTopic: getTopic,
  updateTopic: updateTopic,
  removeTopic: removeTopic,
  getAllArticlesOfOneTopic: getAllArticlesOfOneTopic,
  getAllArticlesOfAllTopics: getAllArticlesOfAllTopics,
  findByQuery: findByQuery
}
