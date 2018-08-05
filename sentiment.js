const language = require('@google-cloud/language')
const client = new language.LanguageServiceClient()

// text to analyze
const text = 'Hello world'
const document = {
  content: text,
  type: 'PLAIN_TEXT'
}

client
  .analyzeSentiment({document})
  .then(results => {
    const sentiment = results[0].documentSentiment

    console.log('My text')
    console.log(`Sentiment score: ${sentiment.score}`)
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`)
  })
  .catch(err => {
    console.error('ERROR:', err)
  })
