'use strict';

const MAX_COUNT_LISTS = require('./utils/constants').MAX_COUNT_LISTS;
const Twitter = require('./twitter');

module.exports = lists;

/**
 * A Promise that returns the lists given a username.
 * @param {string} username - The twitter username.
 * @return {void}
 */
function lists(username) {
  const parameters = {
    count: MAX_COUNT_LISTS,
    screen_name: username,
  };

  return new Promise((resolve, reject) => {
    Twitter.get('lists/ownerships', parameters, (err, data) => {
      if (err || !data.lists.length) {
        return reject(!data.lists.length ?
          new Error(`@${username} has not lists or they are private threw in lists module.`) :
          new Error(`${err.message} From Twitter API threw in lists module.`));
      }

      resolve(data.lists.map(list => { return { id: list.id, name: list.name } }));
    });
  });
}
