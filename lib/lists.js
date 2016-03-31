'use strict';

const MAX_COUNT_LISTS = require('./constants').MAX_COUNT_LISTS;

/**
 * A Promise that returns the lists given a username.
 * @param {Object} Twitter - The Twit instance.
 * @param {string} username - The twitter username.
 * @return {void}
 */
function lists(Twitter, username) {
  const parameters = {
    count: MAX_COUNT_LISTS,
    screen_name: username,
  };

  const noLists = data => data && data.lists && !data.lists.length;

  return new Promise((resolve, reject) => {
    Twitter.get('lists/ownerships', parameters, (err, data) => {
      if (err || noLists(data)) {
        return reject(noLists(data) ?
          new Error(`@${username} has no lists or these are private threw in lists module.`) :
          new Error(`${err.message} from Twitter API threw in lists module.`));
      }

      return resolve(
        data.lists.map(
          list => ({ id: list.id, name: list.name })
        )
      );
    });
  });
}

module.exports = lists;
