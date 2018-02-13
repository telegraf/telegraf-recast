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
  ctx.state.recast.act        // type of text
  ctx.state.recast.intent     // first intent
  ctx.state.recast.intents    // intents
  ctx.state.recast.source     // original text
  ctx.state.recast.entities   // entities
  ctx.state.recast.raw        // raw recast.ai response
})
```
