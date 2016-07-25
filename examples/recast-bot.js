// Example bot: https://recast.ai/dotcypress/smart-home-example/core

const Telegraf = require('telegraf')
const RecastAi = require('../lib/telegraf-recast')

// Smart home MVP
class SmartHome {
  constructor () {
    this.temperature = {
      'kitchen': 70,
      'living room': 70,
      'bedroom': 70
    }
  }

  hasRoom (name) {
    return this.temperature[name]
  }

  setTemperature (name, value) {
    this.temperature[name] = value
  }

  getRoomTemperature (name) {
    const temp = this.temperature[name]
    if (!temp) {
      return
    }
    return `Temperature for ${name}: ${temp}ºF`
  }

  overview () {
    var status = 'Temperature:\n'
    Object.keys(this.temperature).forEach((key) => {
      status += `${key}: ${this.temperature[key]}ºF\n`
    })
    return status
  }
}

// Smart home bot MVP
const app = new Telegraf(process.env.BOT_TOKEN)
const recast = new RecastAi(process.env.RECASTAI_TOKEN)
const mySmartHome = new SmartHome()

// Add recast.ai middleware
app.use(recast.middleware())

// Intent handler
recast.on('termostat', (ctx) => {
  // First sentence
  const sentence = ctx.state.recast.sentence

  // Get first room / temperature entity
  const room = sentence.entities.room && sentence.entities.room[0]
  const temperature = sentence.entities.temperature && sentence.entities.temperature[0]
  switch (sentence.type) {
    // Handle command
    case 'command':
    case 'assert':
      if (!room || !temperature || !mySmartHome.hasRoom(room.value)) {
        return ctx.reply('What?')
      }
      mySmartHome.setTemperature(room.value, temperature.value)
      return ctx.reply(mySmartHome.getRoomTemperature(room.value))
    // Handle question
    case 'what':
      return room
        ? ctx.reply(mySmartHome.getRoomTemperature(room.value))
        : ctx.reply(mySmartHome.overview())
  }
  return ctx.reply("I can't handle that?")
})

recast.otherwise((ctx) => {
  return ctx.reply("I can't handle that?")
})

app.startPolling()
