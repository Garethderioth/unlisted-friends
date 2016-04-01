'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

/**
 * A Promise that returns the lists given a username.
 * @param {Object} Twitter - The Twit instance.
 * @param {string} username - The twitter username.
 * @return {void}
 */
function lists(Twitter, username) {
  var parameters = {
    count: _constants.MAX_COUNT_LISTS,
    screen_name: username
  };

  var noLists = function noLists(data) {
    return data && data.lists && !data.lists.length;
  };

  return new Promise(function (resolve, reject) {
    Twitter.get('lists/ownerships', parameters, function (err, data) {
      if (err || noLists(data)) {
        return reject(noLists(data) ? new Error('@' + username + ' has no lists or these are private threw in lists module.') : new Error(err.message + ' from Twitter API threw in lists module.'));
      }

      return resolve(data.lists.map(function (list) {
        return { id: list.id, name: list.name };
      }));
    });
  });
}

exports.default = lists;