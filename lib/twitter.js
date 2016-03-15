'use strict';

const keys = require('../keys');
const Twit = require('twit');

/**
 * [Twit description]
 * @param {[type]} {                                      app_only_auth: true [description]
 * @param {[type]} consumer_key:    keys.CONSUMER_KEY     [description]
 * @param {[type]} consumer_secret: keys.CONSUMER_SECRET} [description]
 */
const Twitter = new Twit({
  app_only_auth: true,
  consumer_key: keys.CONSUMER_KEY,
  consumer_secret: keys.CONSUMER_SECRET,
});

module.exports = Twitter;
