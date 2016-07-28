import test from 'ava';
import members from '../src/lib/members';
import connectToTwitter from '../src/lib/utils/connect-to-twitter';
import { CONSUMER_KEY, CONSUMER_SECRET } from './helpers/env-constants';

const Twitter = connectToTwitter(CONSUMER_KEY, CONSUMER_SECRET);

test(`Given a list of lists
      When I ask for their members
      Then I should have a list of members.`, t => {
  const listsList = [{ id: 64132003 }, { id: 50051688 }];

  return members(Twitter, listsList).then(memberList => {
    t.truthy(memberList.length);
  });
});

test(`Given a undefined list
      When I ask for their members
      Then I should throw an error.`, t => {
  t.throws(members(Twitter));
});
