const mlabUsername = process.env.MLAB_USERNAME;
const mlabPassword = process.env.MLAB_PASSWORD;

module.exports = {
  messenger: {
    appId: process.env.FACEBOOK_CLIENT_ID,
    appSecret: process.env.FACEBOOK_CLIENT_SECRET,
    accessToken: process.env.FACEBOOK_ACCESSTOKEN_CITYAI,
    verifyToken: process.env.FACEBOOK_VERIFY_TOKEN,
  },
  mongourl: `mongodb://${mlabUsername}:${mlabPassword}@ds163162.mlab.com:63162/newsapp`
};
