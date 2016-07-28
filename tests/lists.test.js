import test from 'ava';
import lists from '../src/lib/lists';
import connectToTwitter from '../src/lib/utils/connect-to-twitter';
import { CONSUMER_KEY, CONSUMER_SECRET } from './helpers/env-constants';

const Twitter = connectToTwitter(CONSUMER_KEY, CONSUMER_SECRET);

test(`Given an username
      When I ask his/her lists
      Then I should have his/her lists.`, t => {
  const username = 'Garethderioth';

  return lists(Twitter, username).then(userLists => {
    t.truthy(userLists.length);
  });
});

test(`Given an username that doesn\'t follow anyone
      When I ask for his/her lists
      Then I should throw an error.`, t => {
  const username = 'Pictoline';

  t.throws(lists(Twitter, username));
});

test(`Given an undefined username
      When I ask his/her lists
      Then I should throw an error.`, t => {
  t.throws(lists(Twitter));
});
