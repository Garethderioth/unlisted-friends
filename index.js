'use strict';

const friends = require('./lib/friends');
const lists = require('./lib/lists');
const members = require('./lib/members');

/**
 * [init description]
 * @param  {[type]} username [description]
 * @return {[type]}          [description]
 */
function init(username) {
  friends(username, null, null, friendList => {
    console.info('FRIENDS_LENGTH:', friendList.length);

    lists(username, userLists => {
      console.info('LIST_LENGTH:', userLists.length);

      if(!userLists.length) {
        console.log('You dont have lists, or your lists are privated');
        return;
      }

      members(userLists, null, null, member => {
        console.info('USERS_LENGTH:', member.length);

        const unlistedFriends = friendList.filter(friend => {
          return member.filter(user => {
            return user.userId === friend.userId;
          }).length === 0;
        });

        if (unlistedFriends.length === 0 ) {
          console.log('Congratulations! All your friends are in a list!');
        } else {
          console.log(unlistedFriends.map(unlistedFriend => {
            return 'https://twitter.com/' + unlistedFriend.userName;
          }).join('\n'));
        }
      });
    });
  });
}

// TODO: Move this to UI
init('Garethderioth');
