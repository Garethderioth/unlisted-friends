'use strict';

const tape = require('tape');
const concatFriends = require('../../../../lib/utils/concat-friends');

tape('Concat Friends: Should concat a friend list with a Twitter friend list', assert => {
  const friendsList = [
    {
      id: 1,
      name: 'foo',
    },
    {
      id: 3,
      name: 'foobar',
    },
  ];

  const usersList = [
    {
      id: 2,
      screen_name: 'bar',
    },
    {
      id: 4,
      screen_name: 'barfoo',
    },
  ];

  const expected = [
    {
      id: 1,
      name: 'foo',
    },
    {
      id: 3,
      name: 'foobar',
    },
    {
      id: 2,
      name: 'bar',
    },
    {
      id: 4,
      name: 'barfoo',
    },
  ];

  assert.deepEqual(concatFriends(friendsList, usersList), expected);
  assert.end();
});
