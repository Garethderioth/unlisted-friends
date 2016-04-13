import test from 'ava';
import filterFriends from '../src/lib/utils/filter-friends';

test('Filter a friend list given a member list without a friend', t => {
  const friendList = [
    {
      id: 66,
      name: 'Guillermo',
    },
  ];

  const memberList = [
    {
      id: 58,
      name: 'Pablo',
    },
    {
      id: 22,
      name: 'Pedro',
    },
  ];

  const filteredList = [
    {
      id: 66,
      name: 'Guillermo',
    },
  ];

  t.same(filteredList, filterFriends(friendList, memberList));
});

test('Not filter a friend list given a member list with all friends', t => {
  const friendList = [
    {
      id: 66,
      name: 'Guillermo',
    },
  ];

  const memberList = [
    {
      id: 58,
      name: 'Pablo',
    },
    {
      id: 22,
      name: 'Pedro',
    },
    {
      id: 66,
      name: 'Guillermo',
    },
  ];

  const filteredList = [];

  t.same(filteredList, filterFriends(friendList, memberList));
});
