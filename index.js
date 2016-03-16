'use strict';

const filterFriends = require('./lib/utils/filter-friends');
const keys = require('./keys');

const friends = require('./lib/friends');
const lists = require('./lib/lists');
const members = require('./lib/members');

const Twit = require('twit');

/**
 * Print the result of the search given a list of friends.
 * @param {string} username - The twitter username.
 * @param {Object[{id: number, name: string}]} friendsList - The list of friends.
 * @return {void}
 */
function printResults(username, friendsList) {
  let result = [`Congratulations @${username}! All your friends are in a list!`];

  if (friendsList && friendsList.length) {
    result = friendsList.map(friend => (`https://twitter.com/${friend.name}`)).unshift('\n');
  }

  console.log(result.join('\n'));
}

/**
 * Print the summary of the search given every list.
 * @param {Object[{id: number, name: string}]} friendsList - The list of friends.
 * @param {Object[{id: number, name: string}]} userLists - The lists of user's list.
 * @param {Object[{id: number, name: string}} membersList - The list of the list's members.
 * @param {Object[{id: number, name: string}} unlistedFriends - The list of the unlisted friends.
 * @return {void}
 */

function printSummary(userLists, friendsList, membersList, unlistedFriends) {
  const summary = [
    `Lists: ${userLists.length}`,
    `Friends: ${friendsList.length}`,
    `Members: ${membersList.length}`,
    `Unlisted friends: ${unlistedFriends.length}`,
  ];

  console.log(summary.join('\n'));
}

/**
 * Get the members of the given lists using a Promise.
 * @param {string} username - The twitter username.
 * @param {Object[{id: number, name: string}]} friendsList - The list of friends.
 * @param {Object[{id: number, name: string}]} userLists - The lists of user's list
 * @return {void}
 */
function getMembers(Twitter, username, friendsList, userLists) {
  members(Twitter, userLists).then(membersList => {
    // TODO: Remove
    console.log(membersList.length);

    const unlisted = filterFriends(friendsList, membersList);

    // Print the results on console
    printResults(username, unlisted);
    printSummary(userLists, friendsList, membersList, unlisted);
  }, reason => {
    console.log(reason);
  });
}

/**
 * Get the list of the unlisted friends.

 * @return {void}
 */
/**
 * Get the list of the unlisted friends.
 * @param {string} username - The twitter username.
 * @param {string} consumerKey - Twitter consumer key.
 * @param {[type]} consumerSecret - Twitter consumer secret.
 * @return {void}
 */
function getUnlistedFriends(username, consumerKey, consumerSecret) {
  const Twitter = new Twit({
    app_only_auth: true,
    consumer_key: consumerKey || keys.CONSUMER_KEY,
    consumer_secret: consumerSecret || keys.CONSUMER_SECRET,
  });

  Promise.all([friends(Twitter, username), lists(Twitter, username)]).then(response => {
    // TODO: Remove
    console.log(response[0].length);
    console.log(response[1].length);

    getMembers(Twitter, username, response[0], response[1]);
  }, reason => {
    console.log(reason);
  });
}

// Command line input
getUnlistedFriends(process.argv[2]);

module.exports = {
  get: getUnlistedFriends,
};
