"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Concat a a list of friends given two lists.
 * @param {Object[{id: number, name: string}]} friendsList - The list of friends.
 * @param {Object[{id: number, name: string}]} userLists - The lists of user's list
 * @return {void}
 */
function concatFriends() {
  var friendsList = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var usersList = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  return friendsList.concat(usersList.map(function (user) {
    return { id: user.id, name: user.screen_name };
  }));
}

exports.default = concatFriends;