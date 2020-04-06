'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.unlisted = unlisted;
exports.get = get;

var _connectToTwitter = require('./lib/utils/connect-to-twitter');

var _connectToTwitter2 = _interopRequireDefault(_connectToTwitter);

var _filterFriends = require('./lib/utils/filter-friends');

var _filterFriends2 = _interopRequireDefault(_filterFriends);

var _friends = require('./lib/friends');

var _friends2 = _interopRequireDefault(_friends);

var _lists = require('./lib/lists');

var _lists2 = _interopRequireDefault(_lists);

var _members = require('./lib/members');

var _members2 = _interopRequireDefault(_members);

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
 * Get a promise with the list of the names of the unlisted friends.
 * @param {string} username - The twitter username.
 * @param {string} consumerKey - Twitter consumer key.
 * @param {[type]} consumerSecret - Twitter consumer secret.
 * @return {string[]} friendlist - The names of the unlisted friends.
 */
function get(username, consumerKey, consumerSecret, accessToken, accessTokenSecret) {
  var Twitter = (0, _connectToTwitter2.default)(consumerKey, consumerSecret, accessToken, accessTokenSecret);

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

var mapHandleToTwitterLink = function mapHandleToTwitterLink(handle) {
  return 'https://www.twitter.com/' + handle;
};

/**
 * Check if is being calling from the command line to log the results
 */
if (process.argv && process.argv.length >= 5) {
  var _process$argv = _slicedToArray(process.argv, 7),
      x = _process$argv[0],
      // eslint-disable-line
  y = _process$argv[1],
      // eslint-disable-line
  username = _process$argv[2],
      consumerKey = _process$argv[3],
      consumerSecret = _process$argv[4],
      accessToken = _process$argv[5],
      accessTokenSecret = _process$argv[6];

  get(username, consumerKey, consumerSecret, accessToken, accessTokenSecret).then(function (unlistedFriends) {
    return console.log(unlistedFriends.map(mapHandleToTwitterLink));
  }).catch(console.log);
}