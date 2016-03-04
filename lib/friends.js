'use strict';

const Twitter = require('./twitter');

module.exports = friends;

/**
 * [concatFriends description]
 * @param  {[type]} friendsList [description]
 * @param  {[type]} usersList   [description]
 * @return {[type]}             [description]
 */
function concatFriends(friendsList, usersList) {
  return (friendsList || []).concat((usersList || [])).map(user => {
    return { id: user.id, name: user.screen_name };
  });
}

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
        if (err) {
          reject(err)
        }

        const friendsList = concatFriends(stored && stored.friendsList, data.users);
        const store = { friendsList, cursor: data.next_cursor };

        resolve(store.cursor ? { username, store } : friendsList);
    });
  }).then( response  => {
    if (Array.isArray(response)) {
      return response;
    }

    return friends(response.username, response.store);
  });
}
