'use strict';

const friends = require('./lib/friends');
const lists = require('./lib/lists');
const members = require('./lib/members');


function filterFriends(friendsList, membersList) {
  return friendList.filter(friend => {
    return membersList.filter(user => {
      return user.id === friend.id;
    }).length === 0;
  });
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

      const unlistedFriends = filterFriends(friendsList, membersList);

      console.log(unlistedFriends);

      if (unlistedFriends.length === 0 ) {
        console.log('Congratulations! All your friends are in a list!');
      } else {
        console.log(unlistedFriends.map(unlistedFriend => {
          return 'https://twitter.com/' + unlistedFriend.userName;
        }).join('\n'));
      }
    }, reason => { console.log(reason); });

  }, reason => { console.log(reason); });
}

// TODO: Move to as a service
init('Garethderioth');
