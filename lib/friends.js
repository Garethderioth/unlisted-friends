'use strict';

const Twitter = require('./twitter');
const concatFriends = require('./concat-friends');

module.exports = friends;

/**
 * [friends description]
 * @param  {[type]}   username    [description]
 * @param  {[type]}   friendsList [description]
 * @param  {[type]}   cursor      [description]
 * @param  {Function} callback    [description]
 * @return {[type]}               [description]
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
