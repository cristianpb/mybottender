const { MessengerHandler } = require('bottender');
const { getAttachment } = require('bottender/utils');
const { MongoClient } = require('mongodb');
const config = require('./bottender.config');


const handler = new MessengerHandler()
  .onText(/news/i, async context => {
    const connection = await MongoClient.connect(config.mongourl, { useNewUrlParser: true });
    const db = await connection.db('newsapp');
    try {
      const res1 = await db.collection('news')
        .find({})
        .toArray();
      await context.sendText(`From: ${res1[0]['source']['name']}, \n${res1[0]['title']} \nPublished at: ${res1[0]['publishedAt']}\n${res1[0]['url']}`);
      if (!process.env.USE_CONSOLE) {
        await context.sendImage(res1[0]['urlToImage']);
      }
    } catch (e) {
      console.log(e);
    }
  })
  .onText(/yo/i, async context => {
    await context.sendText('Hello there');
  })
  .onEvent(async context => {
    await context.sendText("I don't know what you say.");
  })
  .onError(async context => {
    await context.sendText('Something wrong happened.');
  });

module.exports = handler;
