const debug = require('debug')('telegraf:recast.ai')
const fetch = require('node-fetch')
const { Router } = require('telegraf')

class RecastAi extends Router {
  constructor (token) {
    super((ctx) => {
      if (!ctx.message || !ctx.message.text) {
        return Promise.resolve()
      }
      return this.request(ctx.message.text)
        .then((response) => {
          if (!response.results || !response.results.intents) {
            return Promise.resolve()
          }
          const context = new RecastContext(response.results)
          return Promise.resolve({
            route: context.intent.slug,
            state: {
              recast: context
            }
          })
        })
    })
    this.token = token
  }

  request (message) {
    debug('request', message)
    return fetch('https://api.recast.ai/v2/request', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({text: message})
    }).then((response) => response.json())
  }
}

class RecastContext {

  constructor (data) {
    this.data = data || {}
  }

  get raw () {
    return this.data
  }

  get language () {
    return this.data.language
  }

  get version () {
    return this.data.version
  }

  get timestamp () {
    return this.data.timestamp
  }

  get act() {
		return this.data.act;
	}

  get intent () {
    return this.intents[0]
  }

  get intents () {
    return this.data.intents || []
  }

  get entities() {
		return this.data.entities || {};
	}

	get source() {
		return this.source;
	}
}

module.exports = RecastAi
