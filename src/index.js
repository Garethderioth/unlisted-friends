import connectToTwitter from './lib/utils/connect-to-twitter';
import filterFriends from './lib/utils/filter-friends';

import friends from './lib/friends';
import lists from './lib/lists';
import members from './lib/members';

/**
 * Get the list of the unlisted friends.
 * @param {Object} Twitter - The Twit instance.
 * @param {string} username - The twitter username.
 * @param {Object[{id: number, name: string}]} memberList - The members of the lists.
 * @return {Object[{id: number, name: string}]} unlistedList - The list of unlisted friends.å
 */
export function unlisted(Twitter, username, memberList) {
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
export function get(username, consumerKey, consumerSecret, accessToken, accessTokenSecret) {
  const Twitter = connectToTwitter(consumerKey, consumerSecret, accessToken, accessTokenSecret);

  return lists(Twitter, username)
  .then(userLists => members(Twitter, userLists))
  .then(memberList => unlisted(Twitter, username, memberList))
  .then(friendlist => friendlist.map(friend => friend.name));
}

const mapHandleToTwitterLink = handle => `https://www.twitter.com/${handle}`;

// FIXME: @glrodasz command line option
if (process.argv && process.argv.length >= 5) {
  const [
    x, // eslint-disable-line
    y, // eslint-disable-line
    username,
    consumerKey,
    consumerSecret,
    accessToken,
    accessTokenSecret,
  ] = process.argv;

  get(username, consumerKey, consumerSecret, accessToken, accessTokenSecret)
    .then(unlistedFriends => console.log(unlistedFriends.map(mapHandleToTwitterLink)))
    .catch(console.log);
}
