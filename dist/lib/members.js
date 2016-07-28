'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

var _concatFriends = require('./utils/concat-friends');

var _concatFriends2 = _interopRequireDefault(_concatFriends);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A Promise that returns the members given a list of lists.
 * @param {Object} Twitter - The Twit instance.
 * @param {Object[{id: number, name: string}]} listsList - The lists of user's list.
 * @param {Object{index: number, memberList: Object[{id: number, name: string}]}}
 * stored - The recursion data.
 * @return {void}
 */
function members(Twitter) {
  var listsList = arguments.length <= 1 || arguments[1] === undefined ? [{ id: '' }] : arguments[1];
  var stored = arguments[2];

  var index = stored && stored.index || 0;

  var parameters = {
    count: _constants.MAX_COUNT_MEMBERS,
    list_id: listsList[index].id
  };

  return new Promise(function (resolve, reject) {
    Twitter.get('lists/members', parameters, function (err, data) {
      if (err || data && data.users && !data.users.length) {
        return reject(new Error(err.message + ' From Twitter API threw in members module.'));
      }

      var memberList = (0, _concatFriends2.default)(stored && stored.memberList, data.users);
      var store = { memberList: memberList, index: ++index };
      return resolve(listsList[index] ? { listsList: listsList, store: store } : memberList);
    });
  }).then(function (response) {
    return Array.isArray(response) ? response : members(Twitter, response.listsList, response.store);
  });
}

exports.default = members;