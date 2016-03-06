'use strict';

module.exports = filterFriends;

/**
 * [filterFriends description]
 * @param  {[type]} friendsList [description]
 * @param  {[type]} membersList [description]
 * @return {[type]}             [description]
 */
function filterFriends(friendsList, membersList) {
  return friendsList.filter(friend => {
    return membersList.filter(member => member.id === friend.id).length === 0;
  });
}
