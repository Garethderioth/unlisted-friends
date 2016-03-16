'use strict';

const keys = require('../keys');
const Twit = require('twit');

/**
 * Twitter API Client for node.
 * @param {Object{app_only_auth: boolean, consumer_key: string, consumer_secret: string}} constructor - The Twit constructor.
 */
const Twitter = new Twit({
  app_only_auth: true,
  consumer_key: keys.CONSUMER_KEY,
  consumer_secret: keys.CONSUMER_SECRET,
});

module.exports = Twitter;
