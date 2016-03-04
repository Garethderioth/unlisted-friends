'use strict';

const keys = require('../keys');
const Twit = require('twit');

const Twitter = new Twit({
  app_only_auth: true,
  consumer_key: keys.CONSUMER_KEY,
  consumer_secret: keys.CONSUMER_SECRET,
});

module.exports = Twitter;
