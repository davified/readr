const summary = require('node-tldr')

summary.summarize('https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36#.xgqopyojt', function (result, failure) {
  if (failure) {
    console.log('An error occured! ' + result.error)
  }
  // console.log(result);
  console.log(result.title)
  console.log(result.words)
  console.log(result.compressFactor)
  console.log(result.summary.join('\n'))
})
