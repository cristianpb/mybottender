const { ConsoleBot, MessengerBot, } = require('bottender');
const handler = require('./handler');
const config = require('./bottender.config');

if (process.env.USE_CONSOLE === 'true') {
  const bot = new ConsoleBot().onEvent(handler);
  bot.createRuntime();
} else {
  const { createServer } = require('bottender/express');
  const PORT = process.env.PORT || 5000
  const bot = new MessengerBot({
    accessToken: config.messenger.accessToken,
    appSecret: config.messenger.appSecret,
  });

  bot.onEvent(handler);

  const server = createServer(bot, { verifyToken: config.messenger.verifyToken });

  server.listen(PORT, () => {
    console.log(`server is running on ${PORT} port...`);
  });
}
