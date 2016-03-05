'use strict';

const Twitter = require('./twitter');

module.exports = lists;

/**
 * [lists description]
 * @param  {[type]}   username [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function lists(username) {
  const parameters = {
    count: 100,
    reverse: true,
    screen_name: username,
  };

  return new Promise((resolve, reject) => {
    Twitter.get('lists/list', parameters, (err, data) => {
      if (err || !data) {
        return reject(err.message);
      }

      resolve(data.map(list => { return { id: list.id, name: list.name } }));
    });
  });
}
