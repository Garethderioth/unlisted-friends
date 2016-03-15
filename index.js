'use strict';

const filterFriends = require('./lib/utils/filter-friends');
const friends = require('./lib/friends');
const lists = require('./lib/lists');
const members = require('./lib/members');

/**
 * Print the result of the search given a list of friends.
 * @param  {string} username - The twitter username
 * @param  {Object[{id: number, name: string}]} friendsList - The list of friends
 * @return {void}
 */
function printResults(username, friendsList) {
  let result = [`Congratulations @${username}! All your friends are in a list!`];

  if (friendsList && friendsList.length) {
    result = friendsList.map(friend => (`https://twitter.com/${friend.name}`));
  }

  console.log(result.join('\n'));
}

/**
 * Print the summary of the search given every list.
 * @param  {Object[{id: number, name: string}]} friendsList - The list of friends
 * @param  {Object[{id: number, name: string}]} userLists - The lists of user's list
 * @param  {Object[{id: number, name: string}} membersList - The list of the list's members
 * @param  {Object[{id: number, name: string}} unlistedFriends - The list of the unlisted friends.
 * @return {void}
 */
function printSummary(friendsList, userLists, membersList, unlistedFriends) {
  const summary = [
    `Friends: ${friendsList.length}`,
    `Lists: ${userLists.length}`,
    `Members: ${membersList.length}`,
    `Unlisted friends: ${unlistedFriends.length}`,
  ];

  console.log(summary.join('\n'));
}

/**
 * Get the members of the given lists using a Promise.
 * @param  {Object[{id: number, name: string}]} friendsList - The list of friends
 * @param  {Object[{id: number, name: string}]} userLists - The lists of user's list
 * @return {void}
 */
function getMembers(username, friendsList, userLists) {
  members(userLists).then(membersList => {
    const unlistedFriends = filterFriends(friendsList, membersList);

    // TODO: Move the print functions to the point #1
    printSummary(friendsList, userLists, membersList, unlistedFriends);
    printResults(username, unlistedFriends);
  }, reason => {
    console.error(reason);
  });
}

/**
 * Get the list of the unlisted friends.
 * @param  {[type]} username [description]
 * @return {[type]}          [description]
 */
function getUnlistedFriends(username) {
  Promise.all([
    friends(username),
    lists(username),
  ]).then(response => {
    getMembers(username, response[0], response[1]);
    // TODO: Point #1
  }, reason => {
    console.error(reason);
  });
}

getUnlistedFriends(process.argv[2]);
