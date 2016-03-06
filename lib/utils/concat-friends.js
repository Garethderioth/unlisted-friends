'use strict';

module.exports = concatFriends;

/**
 * [concatFriends description]
 * @param  {[type]} friendsList [description]
 * @param  {[type]} usersList   [description]
 * @return {[type]}             [description]
 */
function concatFriends(friendsList, usersList) {
  return (friendsList || []).concat((usersList || []).map(user => {
    return { id: user.id, name: user.screen_name };
  }));
}
