const { ChalkAdvanced } = require('chalk-advanced');

require("dotenv").config();

module.exports = async (client) => {
  const cmdData = client.commands.map(cmd => cmd.data.toJSON());

  if (process.env.STATUS === "PRODUCTION") { // If the bot is in production mode it will load slash commands for all guilds
    client.application.commands.set(cmdData);
  } else {
    client.guilds.cache.get(process.env.GUILD_ID).commands.set(cmdData);
  }

  client.user.setPresence({
    activities: [{ name: `${process.env.STATUSBOT}` }],
    status: "dnd",
  });

  console.log(ChalkAdvanced.blue('[BOT] Ready.'))
};
