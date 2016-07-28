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
function connectToTwitter(consumerKey, consumerSecret) {
  return new _twit2.default({
    app_only_auth: true,
    consumer_key: consumerKey,
    consumer_secret: consumerSecret
  });
}

exports.default = connectToTwitter;