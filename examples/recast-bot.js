var Telegraf = require('telegraf')
var TelegrafRecast = require('../lib/telegraf-recast')

var app = new Telegraf(process.env.BOT_TOKEN)
var recast = new TelegrafRecast(process.env.RECASTAI_TOKEN)

// Add recast.ai middleware
app.use(recast.middleware())

// Intent handler
recast.onIntent('termostat', function * () {
  // Get first room entity
  var room = this.state.recast.firstEntity('room')

  // Get first temperature entity
  var temperature = this.state.recast.firstEntity('temperature')

  switch (this.state.recast.type) {
    // Handle command
    case 'command':
      if (room && smartHomeMock[room] && temperature) {
        smartHomeMock[room] = temperature.value
        this.reply(`Temperature in ${room} has been settled to ${smartHomeMock[room]} degrees.`)
      } else {
        this.reply('What?')
      }
      break
    // Handle question
    case 'where':
      if (room && smartHomeMock[room]) {
        this.reply(`Temperature in ${room}: ${smartHomeMock[room]}`)
      } else {
        var globalStatus = 'Temperature:\n'
        Object.keys(smartHomeMock).forEach((key) => {
          globalStatus += `${key}: ${smartHomeMock[key]}` + '\n'
          globalStatus += '\n'
        })
        this.reply(globalStatus)
      }
      break
  }
})

app.startPolling()

var smartHomeMock = {
  'kitchen': 70,
  'living room': 70,
  'bedroom': 70
}
