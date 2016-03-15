'use strict';

const MAX_COUNT_FRIENDS = require('./utils/constants').MAX_COUNT_FRIENDS;
const MAX_FRIENDS_CALLS = require('./utils/constants').MAX_FRIENDS_CALLS;
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
  let calls = (stored && stored.calls) || 0;

  const parameters = {
    count: MAX_COUNT_FRIENDS,
    screen_name: username,
    cursor: (stored && stored.cursor) || -1,
  };

  return new Promise((resolve, reject) => {
    Twitter.get('friends/list', parameters, (err, data) => {
      if (err || !data.users.length) {
        return reject(!data.users.length ?
          new Error(`@${username} is not following users threw in friends module.`) :
          new Error(`${err.message} From Twitter API threw in friends module.`));
      }

      const friendsList = concatFriends(stored && stored.friendsList, data.users);
      const store = { friendsList, cursor: data.next_cursor, calls: ++calls };

      resolve(store.cursor && calls <= MAX_FRIENDS_CALLS ? { username, store } : friendsList);
    });
  }).then(response => {
    return Array.isArray(response) ? response : friends(response.username, response.store);
  });
}
