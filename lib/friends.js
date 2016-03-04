'use strict';

const Twitter = require('./twitter');

module.exports = friends;

/**
 * [friends description]
 * @param  {[type]}   username    [description]
 * @param  {[type]}   friendsList [description]
 * @param  {[type]}   cursor      [description]
 * @param  {Function} callback    [description]
 * @return {[type]}               [description]
 */
function friends(username, friendsList, cursor, callback) {
  let currentFriendsList = friendsList || [];
  let currentCursor = cursor || -1;

  Twitter.get('friends/list', {count: 200, cursor: currentCursor, screen_name: username}, (err, data, response) => {
    if (!err) {
      currentFriendsList = currentFriendsList.concat(data.users.map(user => {
        return { userId: user.id, userName: user.screen_name };
      }));

      if (data.next_cursor) {
        friends(username, currentFriendsList, data.next_cursor, callback);
      } else {
        callback(currentFriendsList);
      }
    } else {
      console.error('GET_FRIENDS_IDS_ERR:', err);
    }
  });
}
