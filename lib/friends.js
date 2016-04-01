'use strict';

const MAX_COUNT_FRIENDS = require('./constants').MAX_COUNT_FRIENDS;
const MAX_FRIENDS_CALLS = require('./constants').MAX_FRIENDS_CALLS;
const concatFriends = require('./utils/concat-friends');

/**
 * A Promise that returns the friends given a username.
 * @param {Object} Twitter - The Twit instance.
 * @param {string} username - The twitter username.
 * @param {Object{cursor: number, calls: number, friendList: Object[{id: number, name: string}]}}
 * stored - The recursion data.
 * @return {void}
 */
function friends(Twitter, username, stored) {
  let calls = (stored && stored.calls) || 0;

  const parameters = {
    count: MAX_COUNT_FRIENDS,
    screen_name: username,
    cursor: (stored && stored.cursor) || -1,
  };

  return new Promise((resolve, reject) => {
    Twitter.get('friends/list', parameters, (err, data) => {
      if (err || (data && data.users && !data.users.length)) {
        return reject(data && data.users && !data.users.length ?
          new Error(`@${username} is not following users threw in friends module.`) :
          new Error(`${err.message} From Twitter API threw in friends module.`));
      }

      const friendList = concatFriends(stored && stored.friendList, data.users);
      const store = { friendList, cursor: data.next_cursor, calls: ++calls };

      return resolve(store.cursor && calls <= MAX_FRIENDS_CALLS ? { username, store } :
        friendList);
    });
  }).then(response => {
    return Array.isArray(response) ? response : friends(Twitter, response.username, response.store);
  });
}

module.exports = friends;
