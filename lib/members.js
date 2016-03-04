'use strict';

const Twitter = require('./twitter');

/**
 * [getListsMembers description]
 * @param  {[type]}   lists     [description]
 * @param  {[type]}   index     [description]
 * @param  {[type]}   usersList [description]
 * @param  {Function} callback  [description]
 * @return {[type]}             [description]
 */
module.exports = members;

/**
 * [members description]
 * @param  {[type]}   lists     [description]
 * @param  {[type]}   index     [description]
 * @param  {[type]}   usersList [description]
 * @param  {Function} callback  [description]
 * @return {[type]}             [description]
 */
function members(lists, index, usersList, callback) {
  let currentIndex = index || 0;
  let currentUsersList = usersList || [];

  Twitter.get('lists/members', {list_id: lists[currentIndex].listId, count: 5000 }, (err, data, response) => {
    if (!err) {
      currentUsersList = currentUsersList.concat(data.users.map(user => {
        return { userId: user.id, userName: user.screen_name };
      }));

      currentIndex += 1;

      if (lists[currentIndex]) {
        members(lists, currentIndex, currentUsersList, callback);
      } else {

        callback(currentUsersList);
      }
    } else {
      console.error('GET_LISTS_MEMBERS_ERR:', err);
    }
  });
}
