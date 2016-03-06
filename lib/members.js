'use strict';

const concatFriends = require('./utils/concat-friends');
const Twitter = require('./twitter');

module.exports = members;

/**
 * [members description]
 * @param  {[type]} listsList [description]
 * @param  {[type]} stored    [description]
 * @return {[type]}           [description]
 */
function members(listsList, stored) {
  let index = (stored && stored.index) || 0;

  const parameters = {
    count: 5000,
    list_id: listsList[index].id,
  };

  return new Promise((resolve, reject) => {
    Twitter.get('lists/members', parameters, (err, data) => {
      if (err || !data) {
        return reject(err.message);
      }

      const membersList = concatFriends(stored && stored.membersList, data.users);
      const store = { membersList, index: ++index };

      resolve( listsList[index] ? { listsList, store } : membersList);
    });
  }).then(response => {
    return Array.isArray(response) ? response : members(response.listsList, response.store);
  });
}
