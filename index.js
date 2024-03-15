const { Client, Events, GatewayIntentBits } = require('discord.js');
const { Collection } = require('discord.js');
//const { token } = require('./config.json');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fs = require('fs').promises;
const path = require('path');
client.commands = new Collection()
client.queue = new Map()
client.config = {
	prefix: "%"
};
// Loading Events
fs.readdir(path.join(__dirname, 'events'))
  .then(files => {
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
      const event = require(path.join(__dirname, 'events', file));
      const eventName = file.split('.')[0];
      client.on(eventName, event.bind(null, client));
      console.log('Loading Event: ' + eventName);
    });
  })
  .catch(err => console.error(err));

fs.readdir(path.join(__dirname, 'commands'))
  .then(files => {
    files.forEach(file => {
      if (!file.endsWith('.js')) return;
      const props = require(path.join(__dirname, 'commands', file));
      const commandName = file.split('.')[0];
      client.commands.set(commandName, props);
      console.log('Loading Command: ' + commandName);
    });
  })
  .catch(err => console.error(err));
const BOT = process.env.TOKEN

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${client.user.username}`);
	client.user.setPresence({
        status: 'dnd',
        activities: [{
            name: 'Hello, World!',
            type: 'PLAYING'
        }]
    });
//    .catch(console.error);
});


client.login("BOT");