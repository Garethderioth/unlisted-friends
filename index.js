'use strict';

const filterFriends = require('./lib/utils/filter-friends');
const friends = require('./lib/friends');
const lists = require('./lib/lists');
const members = require('./lib/members');

/**
 * [printFriends description]
 * @param  {[type]} username    [description]
 * @param  {[type]} friendsList [description]
 * @return {[type]}             [description]
 */
function printFriends(username, friendsList) {
  let result = [`Congratulations @${username}! All your friends are in a list!`];

  if (friendsList && friendsList.length) {
    result = friendsList.map(friend => (`https://twitter.com/${friend.name}`));
  }

  console.log(result.join('\n'));
}

/**
 * [printSummary description]
 * @param  {[type]} friendsList     [description]
 * @param  {[type]} userLists       [description]
 * @param  {[type]} membersList     [description]
 * @param  {[type]} unlistedFriends [description]
 * @return {[type]}                 [description]
 */
function printSummary(friendsList, userLists, membersList, unlistedFriends) {
  const summary = [
    `Friends: ${friendsList.length}`,
    `Lists: ${userLists.length}`,
    `Members: ${membersList.length}`,
    `Unlisted friends: ${unlistedFriends.length}`
  ];

  console.log(summary.join('\n'));
}

/**
 * [getMembers description]
 * @param  {[type]} friendsList [description]
 * @param  {[type]} userLists   [description]
 * @return {[type]}             [description]
 */
function getMembers(friendsList, userLists) {
  members(userLists).then(membersList => {
    const unlistedFriends = filterFriends(friendsList, membersList);

    printSummary(friendsList, userLists, membersList, unlistedFriends);
    printFriends(username, unlistedFriends);
  }, reason => {
    console.error(reason);
  });
}

/**
 * [getUnlistedFriends description]
 * @param  {[type]} username [description]
 * @return {[type]}          [description]
 */
function getUnlistedFriends(username) {
  Promise.all([
    friends(username),
    lists(username)
  ]).then(response => {
    getMembers(response[0], response[1]);
  }, reason => {
    console.error(reason);
  });
}

getUnlistedFriends(process.argv[2]);
