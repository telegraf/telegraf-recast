# recast.ai middleware for Telegraf

[![Build Status](https://img.shields.io/travis/telegraf/telegraf-recast.svg?branch=master&style=flat-square)](https://travis-ci.org/telegraf/telegraf-recast)
[![NPM Version](https://img.shields.io/npm/v/telegraf-recast.svg?style=flat-square)](https://www.npmjs.com/package/telegraf-recast)

[recast.ai](https://recast.ai/) middleware for [Telegraf](https://github.com/telegraf/telegraf).
Easily create Telegram bots with Natural Language Processing.

## Installation

```js
$ npm install telegraf-recast
```

## Example
  
```js
const Telegraf = require('telegraf')
const TelegrafAI = require('telegraf-recast')

const app = new Telegraf(process.env.BOT_TOKEN)
const recast = new TelegrafAI(process.env.RECASTAI_TOKEN)

// Add recast.ai middleware
app.use(recast.middleware())

// Intent handler
recast.on('termostat', (ctx) => {
  // Some logic
})

```

[See working example](https://github.com/telegraf/telegraf-recast/tree/master/examples).

## API

* `TelegrafAI`
  * [`new TelegrafAI(token)`](#new)
  * [`.on(name, fn, [fn, ...])`](#onIntent)
  * [`.middleware()`](#middleware)
 
<a name="new"></a>
#### `TelegrafAI.new(token)`

Initialize new TelegrafAI.

| Param | Type | Description |
| --- | --- | --- |
| token | `string` | Recast request access token |

* * *

<a name="onIntent"></a>
#### `TelegrafAI.on(name, fn, [fn, ...])`

Adds intent handlers to app

| Param | Type | Description |
| ---  | --- | --- |
| name | `string` | Intent name |
| fn  | `function` | Intent handler middleware |

* * *

## User context

Telegraf user context props and functions:

```js
recast.on('intent name', (ctx) => {
  ctx.state.recast            // Current RecastAI context 
  ctx.state.recast.intent     // first intent
  ctx.state.recast.intents    // intents
  ctx.state.recast.sentence   // first sentence
  ctx.state.recast.sentences  // sentences
  ctx.state.recast.raw        // raw recast.ai response
})
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

