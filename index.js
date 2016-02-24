'use strict';

const tokens = require('./tokens');
const Twit = require('twit');

const twitter = new Twit({
  consumer_key:        tokens.CONSUMER_KEY,
  consumer_secret:     tokens.CONSUMER_SECRET,
  access_token:        tokens.ACCESS_TOKEN,
  access_token_secret: tokens.ACCESS_TOKEN_SECRET,
});

/**
 * [getFriendsIds description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function getFriendsIds(friendsList, cursor, callback) {
  let currentFriendsList = friendsList || [];
  let currentCursor = cursor || -1;

  twitter.get('friends/list', {count: 200, cursor: currentCursor}, (err, data, response) => {
    if (!err) {
      currentFriendsList.push(data.users.map(user => {
        return { userId: user.id, userName: user.screen_name };
      }));

      console.log(currentCursor);

      if (data.next_cursor) {
        getFriendsIds(currentFriendsList, data.next_cursor, callback);
      } else {
        callback(currentFriendsList);
      }
    } else {
      console.error('GET_FRIENDS_IDS_ERR:', err);
    }
  });
};

/**
 * [getListsIds description]
 * @return {[type]} [description]
 */
function getListsIds(callback) {
  twitter.get('lists/list', {count: 100, reverse: true }, (err, data, response) => {
    if (!err) {
      callback(data.map(list => {
        return { listId: list.id, listName: list.name };
      }));
    } else {
      console.error('GET_LISTS_IDS_ERR:', err);
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

  twitter.get('lists/members', {list_id: lists[currentIndex].listId }, (err, data, response) => {
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
      console.error('GET_LISTS_MEMBERS_ERR:', err);
    }
  });
}


function init() {
  getFriendsIds(null, friends => {
    console.info('FRIENDS_LENGTH:', friends.length);

    getListsIds(lists => {
      console.info('LIST_LENGTH:', lists.length);

      getListsMembers(lists, null, null, users => {
        console.info('USERS_LENGTH:', users.length);

        const unlistedFriends = friends.filter(friend => {
          return users.filter(user => {
            return user.userId === friend.userId;
          }).length === 0;
        });

        console.log(unlistedFriends);
      });
    });
  });
}

//init();
getFriendsIds(null, null, friends => { console.info('FRIENDS_LENGTH:', friends.length); });
