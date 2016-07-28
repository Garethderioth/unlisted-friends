# Unlisted Friends
[![Travis](https://img.shields.io/travis/Garethderioth/unlisted-friends.svg)](https://travis-ci.org/Garethderioth/unlisted-friends)
[![Codecov](https://img.shields.io/codecov/c/github/Garethderioth/unlisted-friends.svg)](https://codecov.io/github/Garethderioth/unlisted-friends)
[![npm](https://img.shields.io/npm/v/unlisted-friends.svg)](https://www.npmjs.com/package/unlisted-friends)
[![npm](https://img.shields.io/npm/dt/unlisted-friends.svg)](https://www.npmjs.com/package/unlisted-friends)

A library for verify which following friends on Twitter that are not in your lists.

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
The method returns a Promise with the a list of the names of the unlisted friends.
```javascript
const unlisted = require('unlisted-friends');
const friends = unlisted.get('Garethderioth', '<PUT YOUR KEY HERE>', '<PUT YOUR SECRET HERE>');

friends.then(response => {
  console.log(response);
}, error => {
  console.log(error);
})
```

If you have all your friends in list you will get something like:
```bash
> [Error: @Garethderioth does not have unlisted friends.]
```
But if you have unlisted friends you will get something like:
```bash
> ['CodePen', 'Miss_Mandaline']
```

The Twitter API has some rate limits window divided into 15 minute intervals. Learn more about it [here](https://dev.twitter.com/rest/public/rate-limiting). The library will print a message with the related error:

```bash
> [Error: Rate limit exceeded From Twitter API threw in members module.]
```

## Notes
In order to avoid the Twitter API rate limit, this library retrieves only **6000 friends**, **15 public lists** and **5000 members** for each list.

## Roadmap
* Refactor code for use generators
* Create a CLI version as another repository
