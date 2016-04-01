'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

var _concatFriends = require('./utils/concat-friends');

var _concatFriends2 = _interopRequireDefault(_concatFriends);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A Promise that returns the friends given a username.
 * @param {Object} Twitter - The Twit instance.
 * @param {string} username - The twitter username.
 * @param {Object{cursor: number, calls: number, friendList: Object[{id: number, name: string}]}}
 * stored - The recursion data.
 * @return {void}
 */
function friends(Twitter, username, stored) {
  var calls = stored && stored.calls || 0;

  var parameters = {
    count: _constants.MAX_COUNT_FRIENDS,
    screen_name: username,
    cursor: stored && stored.cursor || -1
  };

  var noUsers = function noUsers(data) {
    return data && data.users && !data.users.length;
  };

  return new Promise(function (resolve, reject) {
    Twitter.get('friends/list', parameters, function (err, data) {
      if (err || noUsers(data)) {
        return reject(noUsers(data) ? new Error('@' + username + ' is not following users threw in friends module.') : new Error(err.message + ' From Twitter API threw in friends module.'));
      }

      var friendList = (0, _concatFriends2.default)(stored && stored.friendList, data.users);
      var store = { friendList: friendList, cursor: data.next_cursor, calls: ++calls };

      return resolve(store.cursor && calls <= _constants.MAX_FRIENDS_CALLS ? { username: username, store: store } : friendList);
    });
  }).then(function (response) {
    return Array.isArray(response) ? response : friends(Twitter, response.username, response.store);
  });
}

exports.default = friends;