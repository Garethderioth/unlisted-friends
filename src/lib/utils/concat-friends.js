/**
 * Concat a a list of friends given two lists.
 * @param {Object[{id: number, name: string}]} friendsList - The list of friends.
 * @param {Object[{id: number, name: string}]} userLists - The lists of user's list
 * @return {void}
 */
function concatFriends(friendsList = [], usersList = []) {
  return friendsList.concat(usersList.map(
    user => ({ id: user.id, name: user.screen_name })
  ));
}

export default concatFriends;
