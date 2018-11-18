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
    accessToken: process.env.FACEBOOK_ACCESSTOKEN_CITYAI,
    appSecret: process.env.FACEBOOK_CLIENT_SECRET,
  });

  bot.onEvent(handler);

  const server = createServer(bot, { verifyToken: process.env.FACEBOOK_VERIFY_TOKEN });

  server.listen(PORT, () => {
    console.log(`server is running on ${PORT} port...`);
  });
}
