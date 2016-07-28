import test from 'ava';
import concatFriends from '../src/lib/utils/concat-friends';

test(`Given an friend list
        And a user list
      When I merged them
      Then I should have a merged list.`, t => {
  const friendList = [
    {
      id: 66,
      name: 'Guillermo',
    },
  ];

  const userList = [
    {
      id: 58,
      screen_name: 'Pablo',
    },
    {
      id: 22,
      screen_name: 'Pedro',
    },
  ];

  const concatedList = [
    {
      id: 66,
      name: 'Guillermo',
    },
    {
      id: 58,
      name: 'Pablo',
    },
    {
      id: 22,
      name: 'Pedro',
    },
  ];

  t.deepEqual(concatFriends(friendList, userList), concatedList);
});

test(`Given empty lists
      When I try to merged them
      Then I should have and empty list.`, t => {
  t.deepEqual(concatFriends(), []);
});
