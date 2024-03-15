module.exports = {
    info: {
      name: "ping",
      description: "Responds with 'Pong!'",
      usage: "ping",
      aliases: ["ping"] // Optional: any aliases for the command
    },
  
    run: async function(client, message, args) {
      // Send "Pong!" as a response
      message.channel.send("Pong!");
    }
  };