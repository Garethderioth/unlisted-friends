import { MAX_COUNT_MEMBERS } from './constants';
import concatFriends from './utils/concat-friends';

/**
 * A Promise that returns the members given a list of lists.
 * @param {Object} Twitter - The Twit instance.
 * @param {Object[{id: number, name: string}]} listsList - The lists of user's list.
 * @param {Object{index: number, memberList: Object[{id: number, name: string}]}}
 * stored - The recursion data.
 * @return {void}
 */
function members(Twitter, listsList, stored) {
  let index = (stored && stored.index) || 0;

  const parameters = {
    count: MAX_COUNT_MEMBERS,
    list_id: listsList[index].id,
  };

  return new Promise((resolve, reject) => {
    Twitter.get('lists/members', parameters, (err, data) => {
      if (err || (data && data.users && !data.users.length)) {
        return reject(new Error(`${err.message} From Twitter API threw in members module.`));
      }

      const memberList = concatFriends(stored && stored.memberList, data.users);
      const store = { memberList, index: ++index };
      return resolve(listsList[index] ? { listsList, store } : memberList);
    });
  }).then(response => {
    return Array.isArray(response) ? response :
      members(Twitter, response.listsList, response.store);
  });
}

export default members;
