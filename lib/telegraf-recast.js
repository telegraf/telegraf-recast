var debug = require('debug')('telegraf:recast.ai')
var fetch = require('node-fetch')
var compose = require('koa-compose')

var recast = TelegrafRecast.prototype
module.exports = TelegrafRecast

function TelegrafRecast (token, opts) {
  if (!token) {
    throw new Error('telegraf-recast: Token is required')
  }
  this.token = token
  this.opts = Object.assign({}, opts)
  this.intentHandlers = {}
  this.messageHandlers = []
}

recast.request = function (message) {
  debug('request', message)
  return fetch('https://api.recast.ai/v1/request', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${this.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      text: message
    })
  })
    .then((response) => response.json())
}

recast.onError = function (err) {
  var msg = err.stack || err.toString()
  console.error(msg.replace(/^/gm, '  '))
}

recast.onMessage = function () {
  var fns = [].slice.call(arguments)
  this.messageHandlers = this.messageHandlers.concat(fns)
}

recast.onIntent = function (intent) {
  if (!intent) {
    throw new Error('telegraf-recast: intent is empty')
  }
  var fns = [].slice.call(arguments, 1)
  this.intentHandlers[intent] = this.intentHandlers[intent] || []
  this.intentHandlers[intent] = this.intentHandlers[intent].concat(fns)
}

recast.middleware = function () {
  var self = this
  return function * (next) {
    if (!this.message || !this.message.text) {
      yield next
      return
    }
    try {
      var response = yield self.request(this.message.text)
      if (response.results) {
        var recatData = response.results
        this.state.recast = recatData
        this.state.recast.allEntities = allEntities.bind(recatData)
        this.state.recast.firstEntity = firstEntity.bind(recatData)
        this.state.recast.intent = recatData.intents ? recatData.intents[0] : null
        this.state.recast.sentence = recatData.sentences ? recatData.sentences[0] : null
        yield compose(self.messageHandlers)
        if (recatData.intents && recatData.intents.length > 0 && self.intentHandlers[recatData.intents[0]]) {
          yield compose(self.intentHandlers[response.results.intents[0]])
        }
        return
      }
      yield next
    } catch (err) {
      self.onError(err)
    }
  }
}

var allEntities = function (name) {
  var entities = []
  this.sentences.forEach((sentence) => {
    if (!sentence.entities[name]) {
      return
    }
    entities = entities.concat(sentence.entities[name])
  })
  return entities
}

var firstEntity = function (name) {
  return this.allEntities(name)[0]
}
