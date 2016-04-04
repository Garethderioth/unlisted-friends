import filterFriends from './lib/utils/filter-friends';

import friends from './lib/friends';
import lists from './lib/lists';
import members from './lib/members';

import Twit from 'twit';

/**
 * Instance a Twit object
 * @param {string} consumerKey - Twitter consumer key.
 * @param {[type]} consumerSecret - Twitter consumer secret.
 * @return {Object} Twit instanced object
 */
function instanceTwit(consumerKey, consumerSecret) {
  return new Twit({
    app_only_auth: true,
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
  });
}

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
  const Twitter = instanceTwit(consumerKey, consumerSecret);

  return lists(Twitter, username)
  .then(userLists => members(Twitter, userLists))
  .then(memberList => unlisted(Twitter, username, memberList))
  .then(friendlist => friendlist.map(friend => friend.name));
}

export const get = getUnlisted;
