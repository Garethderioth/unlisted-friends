'use strict';

const tape = require('tape');
const filterFriends = require('../../../lib/utils/filter-friends');

tape('Filter friends: Should filter friends that are not members of lists', assert => {
  const friendsList = [
    {
      id: 1,
      name: 'foor',
    },
    {
      id: 2,
      name: 'bar',
    },
  ];

  const membersList = [
    {
      id: 2,
      name: 'bar',
    },
  ];

  const expected = [
    {
      id: 1,
      name: 'foo',
    },
  ];

  assert.equals(filterFriends(friendsList, membersList).length, expected.length);
  assert.end();
});

tape('Filter friends: Should not filter nothing when all friends are members of lists', assert => {
  const friendsList = [
    {
      id: 1,
      name: 'foor',
    },
    {
      id: 2,
      name: 'bar',
    },
  ];

  const membersList = [
    {
      id: 1,
      name: 'foor',
    },
    {
      id: 2,
      name: 'bar',
    },
  ];

  const expected = [];

  assert.equals(filterFriends(friendsList, membersList).length, expected.length);
  assert.end();
});
