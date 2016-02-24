'use strict';

const Twit = require('twit');

const T = new Twit({
  consumer_key: 'n0wm5PsJHfNJSXl1KQFMttvTF',
  consumer_secret: '9HkO9UUH0oE5h1RuJkAYvt6DZPXn9Rb9QFRQUHDDvV0dYBHX72',
  access_token: '18968309-p2Khy4SoBUftQReJQ0X3An57ekdFau03TL4D0XSdf',
  access_token_secret: 'SUK2KblWR9oAijEMX7aaRx2GZYjG6XQzsdLNnYWFYOv3u'
});

/**
 * [getFriendsIds description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getFriendsIds(friendsList, callback) {
  let currentFriendsList = friendsList || [];

  T.get('friends/list', {count: 200}, (err, data, response) => {
    if (!err) {
      currentFriendsList.push(data.users.map(user => {
        return { userId: user.id, userName: user.screen_name };
      }));

      if (data.next_cursor) {
        getFriendsIds(currentFriendsList, callback);
      } else {
        callback(currentFriendsList);
      }
    } else {
      console.error(err);
    }
  });
};

/**
 * [getListsIds description]
 * @return {[type]} [description]
 */
function getListsIds(callback) {
  T.get('lists/list', {count: 100, reverse: true }, (err, data, response) => {
    if (!err) {
      callback(data.map(list => {
        return { listId: list.id, listName: list.name };
      }));
    } else {
      console.error(err);
    }
  });
}

/**
 * [getListsMembers description]
 * @param  {[type]}   lists     [description]
 * @param  {[type]}   index     [description]
 * @param  {[type]}   usersList [description]
 * @param  {Function} callback  [description]
 * @return {[type]}             [description]
 */
function getListsMembers(lists, index, usersList, callback) {
  let currentIndex = index || 0;
  let currentUsersList = usersList || [];

  T.get('lists/members', {list_id: lists[currentIndex].listId }, (err, data, response) => {
    if (!err) {
      currentUsersList.push(data.users.map(user => {
        return { userId: user.id, userName: user.screen_name };
      }));

      currentIndex += 1;

      if (lists[currentIndex]) {
        getListsMembers(lists, currentIndex, currentUsersList, callback);
      } else {
        callback(currentUsersList);
      }
    } else {
      console.error(err);
    }
  });
}

getFriendsIds(null, friends => {

  getListsIds(lists => {

    getListsMembers(lists, null, null, users => {
      console.log('USERS', users.length);
      console.log('FRIENDS', friends.length);

      const unlistedFriends = friends.filter(friend => {
        return users.filter(user => {
          return user.userId === friend.userId;
        }).length === 0;
      });

      console.log(unlistedFriends);
    });
  });
});
