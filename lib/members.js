'use strict';

const MAX_COUNT_MEMBERS = require('./utils/constants').MAX_COUNT_MEMBERS;
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
    count: MAX_COUNT_MEMBERS,
    list_id: listsList[index].id,
  };

  return new Promise((resolve, reject) => {
    Twitter.get('lists/members', parameters, (err, data) => {
      if (err || !data) {
        return reject(new Error(`${err.message} From Twitter API threw in members module.`));
      }

      const membersList = concatFriends(stored && stored.membersList, data.users);
      const store = { membersList, index: ++index };

      resolve( listsList[index] ? { listsList, store } : membersList);
    });
  }).then(response => {
    return Array.isArray(response) ? response : members(response.listsList, response.store);
  });
}
