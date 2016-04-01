'use strict';

const filterFriends = require('./lib/utils/filter-friends');

const friends = require('./lib/friends');
const lists = require('./lib/lists');
const members = require('./lib/members');

const keys = require('./keys');
const Twit = require('twit');

/**
 * Get the list of the unlisted friends.
 * @param {Object} Twitter - The Twit instance.
 * @param {string} username - The twitter username.
 * @param {Object[{id: number, name: string}]} memberList - The members of the lists.
 * @return {Object[{id: number, name: string}]} unlistedList - The list of unlisted friends.å
 */
function unlisted(Twitter, username, memberList) {
  return friends(Twitter, username).then(friendList => {
    return new Promise((resolve, reject) => {
      const unlistedList = filterFriends(friendList, memberList);

      return unlistedList && unlistedList.length ? resolve(unlistedList) :
        reject(new Error(`@${username} does not have unlisted friends.`));
    });
  });
}

/**
 * Get A promise with the list of the names of the unlisted friends.
 * @param {string} username - The twitter username.
 * @param {string} consumerKey - Twitter consumer key.
 * @param {[type]} consumerSecret - Twitter consumer secret.
 * @return {string[]} friendlist - The names of the unlisted friends.
 */
function getUnlisted(username, consumerKey, consumerSecret) {
  const Twitter = new Twit({
    app_only_auth: true,
    consumer_key: consumerKey || keys.CONSUMER_KEY,
    consumer_secret: consumerSecret || keys.CONSUMER_SECRET,
  });

  return lists(Twitter, username)
  .then(userLists => members(Twitter, userLists))
  .then(memberList => unlisted(Twitter, username, memberList))
  .then(friendlist => friendlist.map(friend => friend.name));
}

module.exports = { get: getUnlisted };
