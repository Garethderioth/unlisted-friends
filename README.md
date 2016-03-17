# Unlisted Friends
A simple tool for verify which friends are not in your lists.

## Install and setup
```bash
npm install unlisted-friends
```
You need to provide your own application keys for use the **Twitter API**.

1. Visit *https://dev.twitter.com/apps* and register a new application.
2. Go to the application **Keys and Access Tokens** page.
3. Click on **Create my access token** to generate your access tokens.
4. Pass the _consumer key_ and _consumer secret_ as **second and third arguments** respectively when you use the library.

## How to use
```javascript
const unlisted = require('unlisted-friends');
unlisted.get('Garethderioth', '<PUT YOUR KEY HERE>', '<PUT YOUR KEY HERE>');
```

If you have all your friends in list you will get something like:
```bash
> Congratulations @Garethderioth! All your friends are in a list!

Lists: 4
Friends: 227
Members: 227
Unlisted: 0
```
But if you have unlisted friends you will get something like:
```bash
> Lists: 4
Friends: 229
Members: 227
Unlisted: 2

You have the following unlisted friends:
https://twitter.com/CodePen
https://twitter.com/Miss_Mandaline
```

The Twitter API has some rate limits window divided into 15 minute intervals. Learn more about it [here](https://dev.twitter.com/rest/public/rate-limiting). The library will print a message with the related error:

```bash
[Error: Rate limit exceeded From Twitter API threw in members module.]
```

## Notes
In order to avoid the Twitter API rate limit, this library retrieves only **6000 friends**, **15 public lists** and **5000 members** of each list.

## Roadmap
* Refactor to return a Promise
* Refactor to use Map() or Set()
* Include tests
* Include CI badges
* Include version badge
* Improve retrieve lists data limit
* Permit access to the private lists
