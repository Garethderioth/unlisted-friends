import test from 'ava';
import connectToTwitter from '../src/lib/utils/connect-to-twitter';
import keys from './keys';

test(`Given a consumer key
        And a consumer secret
      When I try to connect me with Twitter
      Then I should get connected.`, t => {
  t.truthy(connectToTwitter(
    keys.CONSUMER_KEY || process.env.CONSUMER_KEY,
    keys.CONSUMER_SECRET || process.env.CONSUMER_SECRET
  ));
});

test(`Given a undefined consumer key
        And a undefined consumer secret
      When I try to connect me with Twitter
      Then I should throw an error`, t => {
  t.throws(connectToTwitter);
});
