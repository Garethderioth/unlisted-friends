# Unlisted Friends
A simple tool for verify which friends are not in your lists.

## Setup
You need to provide your own application keys for use the **Twitter API**.

1. Visit *https://dev.twitter.com/apps* and register a new application.
2. Go to the application **Keys and Access Tokens** page.
3. Click on **Create my access token** to generate your access tokens.
4. Put the keys on the file **keys.json.example** and rename it to **keys.json** or pass
them as second and third argument when you use the module.

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
# TODO
```

The Twitter API has some rate limits window divided into 15 minute intervals. Learn more about it [here](https://dev.twitter.com/rest/public/rate-limiting). The library will print a message with the related error:
```bash
[Error: Rate limit exceeded From Twitter API threw in members module.]
```

## Notes
In order to avoid the Twitter API rate limits you can search only in 15 public lists.

## Roadmap
* Refactor to use Map() or Set()
* Include tests
* Include CI badges
* Include version badge
* Improve retrieve lists data limit
* Permit access to the private lists
