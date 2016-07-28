import test from 'ava';
import friends from '../src/lib/friends';
import connectToTwitter from '../src/lib/utils/connect-to-twitter';
import { CONSUMER_KEY, CONSUMER_SECRET } from './helpers/env-constants';

const Twitter = connectToTwitter(CONSUMER_KEY, CONSUMER_SECRET);

test(`Given an username
      When I ask for his/her friend list
      Then I should have his/her friend list.`, t => {
  const username = 'Garethderioth';

  return friends(Twitter, username).then(friendList => {
    t.truthy(friendList.length);
  });
});

test(`Given an username that doesn\'t follow anyone
      When I ask for his/her friend list
      Then I should throw an error.`, t => {
  const username = 'Pictoline';

  t.throws(friends(Twitter, username));
});

test(`Given an undefined username
      When I ask for his/her friend list
      Then I should throw an error.`, t => {
  t.throws(friends(Twitter));
});
