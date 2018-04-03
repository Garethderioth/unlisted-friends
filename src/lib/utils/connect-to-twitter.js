import Twit from 'twit';

/**
 * Instance a Twit object
 * @param {string} consumerKey - Twitter consumer key.
 * @param {[type]} consumerSecret - Twitter consumer secret.
 * @return {Object} Twit instanced object
 */
function connectToTwitter(consumerKey, consumerSecret, accessToken, accessTokenSecret) {
  return new Twit({
    app_only_auth: true,
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
  });
}

export default connectToTwitter;
