'use strict';

const concatFriends = require('./utils/concat-friends');
const Twitter = require('./twitter');

module.exports = friends;

/**
 * [friends description]
 * @param  {[type]} username [description]
 * @param  {[type]} stored   [description]
 * @return {[type]}          [description]
 */
function friends(username, stored) {
  const parameters = {
    count: 200,
    screen_name: username,
    cursor: (stored && stored.cursor) || -1,
  };

  return new Promise((resolve, reject) => {
    Twitter.get('friends/list', parameters, (err, data) => {
      if (err || !data) {
        return reject(err.message);
      }

      const friendsList = concatFriends(stored && stored.friendsList, data.users);
      const store = { friendsList, cursor: data.next_cursor };

      resolve(store.cursor ? { username, store } : friendsList);
    });
  }).then(response => {
    return Array.isArray(response) ? response : friends(response.username, response.store);
  });
}
