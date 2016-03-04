'use strict';

const Twitter = require('./twitter');

module.exports = lists;

/**
 * [lists description]
 * @param  {[type]}   username [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function lists(username, callback) {
  Twitter.get('lists/list', {count: 100, reverse: true, screen_name: username }, (err, data, response) => {
    if (!err) {
      callback(data.map(list => {
        return { listId: list.id, listName: list.name };
      }));
    } else {
      console.error('GET_LISTS_IDS_ERR:', err);
    }
  });
}
