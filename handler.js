const { MessengerHandler } = require('bottender');
const { getAttachment } = require('bottender/utils');
const { MongoClient } = require('mongodb');
const config = require('./bottender.config');


const handler = new MessengerHandler()
  .onText(/news/i, async context => {
    const connection = await MongoClient.connect(config.mongourl, { useNewUrlParser: true });
    const db = await connection.db('newsapp');
    const res1 = await db.collection('news')
      .find({})
      .toArray();
    if (!process.env.USE_CONSOLE) {
      const attachment = getAttachment(res1[0]['urlToImage']);
      await context.sendImage({ attachment_id: attachment.id });
    }
    await context.sendText(res1[0]['title']);
  })
  .onEvent(async context => {
    await context.sendText("I don't know what you say.");
  })
  .onError(async context => {
    await context.sendText('Something wrong happened.');
  });

module.exports = handler;
