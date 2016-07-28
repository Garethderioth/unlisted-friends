import Twit from 'twit';

/**
 * Instance a Twit object
 * @param {string} consumerKey - Twitter consumer key.
 * @param {[type]} consumerSecret - Twitter consumer secret.
 * @return {Object} Twit instanced object
 */
function connectToTwitter(
  consumerKey = process.env.CONSUMER_KEY,
  consumerSecret = process.env.CONSUMER_SECRET
) {
  return new Twit({
    app_only_auth: true,
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
  });
}

export default connectToTwitter;
