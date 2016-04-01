'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = undefined;

var _filterFriends = require('./lib/utils/filter-friends');

var _filterFriends2 = _interopRequireDefault(_filterFriends);

var _friends = require('./lib/friends');

var _friends2 = _interopRequireDefault(_friends);

var _lists = require('./lib/lists');

var _lists2 = _interopRequireDefault(_lists);

var _members = require('./lib/members');

var _members2 = _interopRequireDefault(_members);

var _keys = require('./keys');

var _keys2 = _interopRequireDefault(_keys);

var _twit = require('twit');

var _twit2 = _interopRequireDefault(_twit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get the list of the unlisted friends.
 * @param {Object} Twitter - The Twit instance.
 * @param {string} username - The twitter username.
 * @param {Object[{id: number, name: string}]} memberList - The members of the lists.
 * @return {Object[{id: number, name: string}]} unlistedList - The list of unlisted friends.å
 */
function unlisted(Twitter, username, memberList) {
  return (0, _friends2.default)(Twitter, username).then(function (friendList) {
    return new Promise(function (resolve, reject) {
      var unlistedList = (0, _filterFriends2.default)(friendList, memberList);

      return unlistedList && unlistedList.length ? resolve(unlistedList) : reject(new Error('@' + username + ' does not have unlisted friends.'));
    });
  });
}

/**
 * Get A promise with the list of the names of the unlisted friends.
 * @param {string} username - The twitter username.
 * @param {string} consumerKey - Twitter consumer key.
 * @param {[type]} consumerSecret - Twitter consumer secret.
 * @return {string[]} friendlist - The names of the unlisted friends.
 */
function getUnlisted(username, consumerKey, consumerSecret) {
  var Twitter = new _twit2.default({
    app_only_auth: true,
    consumer_key: consumerKey || _keys2.default.CONSUMER_KEY,
    consumer_secret: consumerSecret || _keys2.default.CONSUMER_SECRET
  });

  return (0, _lists2.default)(Twitter, username).then(function (userLists) {
    return (0, _members2.default)(Twitter, userLists);
  }).then(function (memberList) {
    return unlisted(Twitter, username, memberList);
  }).then(function (friendlist) {
    return friendlist.map(function (friend) {
      return friend.name;
    });
  });
}

var get = exports.get = getUnlisted;