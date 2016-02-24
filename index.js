var Twit = require('twit')

var T = new Twit({
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
  var currentFriendsList = friendsList || [];

  T.get('friends/list', {count: 200}, function(err, data, response) {
    if (!err) {
      currentFriendsList.push(data.users.map(function(user) {
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
  T.get('lists/list', {count: 100, reverse: true }, function(err, data, response) {
    if (!err) {
      callback(data.map(function(list) {
        return { listId: list.id, listName: list.name };
      }));
    } else {
      console.error(err);
    }
  });
}

function getListsMembers(lists, index, usersList, callback) {
  var currentIndex = index || 0;
  var currentUsersList = usersList || [];

  T.get('lists/members', {list_id: lists[currentIndex].listId }, function(err, data, response) {
    if (!err) {
      currentUsersList.push(data.users.map(function(user) {
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

getFriendsIds(null, function(friends) {

  getListsIds(function(lists) {

    getListsMembers(lists, null, null, function(users) {
      console.log('USERS', users.length);
      console.log('FRIENDS', friends.length);

      var unlistedFriends = friends.filter(function(friend) {
          users.forEach(function(user) {
            if (user.userId === friend.userId) {
              return true;
            }
          });
          return false;
      });

      console.log(unlistedFriends);
    });
  });
});
