//const { ConsoleBot } = require('bottender');
//
//const bot = new ConsoleBot();
//
//bot.onEvent(async context => {
//  if (context.event.isText) {
//    await context.sendText(context.event.text);
//  }
//});
//
//bot.createRuntime();
const { MessengerBot, MessengerHandler } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config').messenger;
const PORT = process.env.PORT || 5000

const bot = new MessengerBot({
  accessToken: process.env.FACEBOOK_ACCESSTOKEN_CITYAI,
  appSecret: process.env.FACEBOOK_CLIENT_SECRET,
});

const handler = new MessengerHandler()
  .onText(/yo/i, async context => {
    await context.sendText('Hi there!');
  })
  .onEvent(async context => {
    await context.sendText("I don't know what you say.");
  })
  .onError(async context => {
    await context.sendText('Something wrong happened.');
  });

bot.onEvent(handler);

const server = createServer(bot, { verifyToken: process.env.FACEBOOK_VERIFY_TOKEN });

server.listen(PORT, () => {
  console.log(`server is running on ${PORT} port...`);
});
