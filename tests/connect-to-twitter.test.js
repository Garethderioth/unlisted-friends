import test from 'ava';
import connectToTwitter from '../src/lib/utils/connect-to-twitter';
import { CONSUMER_KEY, CONSUMER_SECRET } from './helpers/env-constants';

test(`Given a consumer key
        And a consumer secret
      When I try to connect me with Twitter
      Then I should get connected.`, t => {
  t.truthy(connectToTwitter(CONSUMER_KEY, CONSUMER_SECRET));
});
