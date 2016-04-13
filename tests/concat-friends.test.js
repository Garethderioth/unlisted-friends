import test from 'ava';
import concatFriends from '../src/lib/utils/concat-friends';

test('Concat a friend list with a user list', t => {
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

  t.same(concatedList, concatFriends(friendList, userList));
});
