/**
 * Get the diference of the friendsList base on the memberList.
 * @param {Object[{id: number, name: string}]} friendsList - The list of friends.
 * @param {Object[{id: number, name: string}} membersList - The list of the list's members.
 * @return {void}
 */
function filterFriends(friendsList, membersList) {
  return friendsList.filter(
    friend => membersList.filter(member => member.id === friend.id).length === 0,
  );
}

export default filterFriends;
