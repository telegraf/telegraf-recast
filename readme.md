# api.ai middleware for Telegraf

[![Build Status](https://img.shields.io/travis/telegraf/telegraf-recast.svg?branch=master&style=flat-square)](https://travis-ci.org/telegraf/telegraf-recast)
[![NPM Version](https://img.shields.io/npm/v/telegraf-recast.svg?style=flat-square)](https://www.npmjs.com/package/telegraf-recast)

[recast.ai](https://recast.ai/) middleware for [Telegraf (Telegram bot framework)](https://github.com/telegraf/telegraf).

## Installation

```js
$ npm install telegraf-recast
```

## Example
  
```js
var Telegraf = require('telegraf')
var TelegrafRecast = require('telegraf-recast')

var app = new Telegraf(process.env.BOT_TOKEN)
var recast = new TelegrafRecast(process.env.RECASTAI_TOKEN)

// Add recast.ai middleware
app.use(recast.middleware())

// Intent handler
recast.onIntent('termostat', function * () {
  // Get first room entity
  var room = this.state.recast.firstEntity('room')
  if (room) {
    this.reply(`Temperature in ${room}: 42`)
  } else {
    this.reply('What?')
  }
})

```

[See also](https://github.com/telegraf/telegraf-recast/tree/master/examples).

## Error Handling

By default TelegrafRecast will print all recast errors to stderr. 
To perform custom error-handling logic you can set `onError` handler:

```js
var recast = new TelegrafRecast(process.env.RECASTAI_TOKEN)

recast.onError = function(err){
  log.error('recast error', err)
}
```

## API

* `TelegrafRecast`
  * [`new TelegrafRecast(token)`](#new)
  * [`.getMeaning(message, outcomes, context)`](#getMeaning)
  * [`.onIntent(name, fn, [fn, ...])`](#onIntent)
  * [`.onMessage(fn, [fn, ...])`](#onMessage)
  * [`.middleware()`](#middleware)
 
<a name="new"></a>
#### `TelegrafRecast.new(token)`

Initialize new TelegrafRecast.

| Param | Type | Description |
| --- | --- | --- |
| token | `string` | Recast request access token |

* * *

<a name="onIntent"></a>
#### `TelegrafRecast.onIntent(name, fn, [fn, ...])`

Adds intent handlers to app

| Param | Type | Description |
| ---  | --- | --- |
| name | `string` | Intent name |
| fn  | `Promise/Generator Function` | Merge handler |

* * *

<a name="onMessage"></a>
#### `TelegrafRecast.onMessage(fn, [fn, ...])`

Adds recast message handlers to app

| Param | Type | Description |
| ---  | --- | --- |
| fn  | `Promise/Generator Function` | Message handler |

* * *

## User context

Telegraf user context props and functions:

```js
recast.onXXX(function * (){
  this.state.recast                     // Current message Recast metadata 
  this.state.recast.intent              // first intent
  this.state.recast.sentence            // first sentence
  this.state.recast.message             // recast message
  this.state.recast.allEntities(name)   // get all entities with provided name
  this.state.recast.firstEntity(name)   // get first entity with provided name
});
```

## License

The MIT License (MIT)

Copyright (c) 2016 Vitaly Domnikov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

