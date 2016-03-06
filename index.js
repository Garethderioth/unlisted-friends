'use strict';

const filterFriends = require('./lib/utils/filter-friends');
const friends = require('./lib/friends');
const lists = require('./lib/lists');
const members = require('./lib/members');

/**
 * [printFriends description]
 * @param  {[type]} friendsList [description]
 * @return {[type]}             [description]
 */
function printFriends(friendsList) {
  return friendsList ?
    friendsList
    .map(friend => ('https://twitter.com/' + friend.name))
    .join('\n') : 'Congratulations! All your friends are in a list!';
}

/**
 * [init description]
 * @param  {[type]} username [description]
 * @return {[type]}          [description]
 */
function init(username) {
  Promise.all([friends(username), lists(username)]).then(response => {
    const friendsList = response[0];
    const userLists = response[1];

    members(userLists).then(membersList => {
      console.info('# Friends:', friendsList.length);
      console.info('# Public lists:', userLists.length);
      console.info("# Members on lists:", membersList.length);

      console.log(printFriends(filterFriends(friendsList, membersList)));
    }, reason => {
      console.error(reason);
    });
  }, reason => {
    console.error(reason);
  });
}

// TODO: Move to as a service
init('Garethderioth');
