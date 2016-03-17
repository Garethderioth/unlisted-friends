'use strict';

const tape = require('tape');
const filterFriends = require('../../../lib/utils/filter-friends');

tape('Filter friends that are not members of lists', (assert) => {
  const msg = 'The friends has not been filtered';

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

  assert.equals(filterFriends(friendsList, membersList).length, expected.length, msg);
  assert.end();
});

tape('Filter friends that are members of lists', (assert) => {
  const msg = 'The friends has not been filtered';

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

  assert.equals(filterFriends(friendsList, membersList).length, expected.length, msg);
  assert.end();
});
