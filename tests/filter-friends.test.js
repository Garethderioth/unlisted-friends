import test from 'ava';
import filterFriends from '../src/lib/utils/filter-friends';

test(`Given a friend list that don\'t have members
        And a member list
      When I filter if my friends are members
      Then I should have a friend list that are not members.`, t => {
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

  t.deepEqual(filteredList, filterFriends(friendList, memberList));
});

test(`Given a friend list that have members
        And a member list
      When I filter if my friends are members
      Then I should have and empty list.`, t => {
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

  t.deepEqual(filteredList, filterFriends(friendList, memberList));
});
