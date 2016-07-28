'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _twit = require('twit');

var _twit2 = _interopRequireDefault(_twit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Instance a Twit object
 * @param {string} consumerKey - Twitter consumer key.
 * @param {[type]} consumerSecret - Twitter consumer secret.
 * @return {Object} Twit instanced object
 */
function connectToTwitter() {
  var consumerKey = arguments.length <= 0 || arguments[0] === undefined ? process.env.CONSUMER_KEY : arguments[0];
  var consumerSecret = arguments.length <= 1 || arguments[1] === undefined ? process.env.CONSUMER_SECRET : arguments[1];

  return new _twit2.default({
    app_only_auth: true,
    consumer_key: consumerKey,
    consumer_secret: consumerSecret
  });
}

exports.default = connectToTwitter;