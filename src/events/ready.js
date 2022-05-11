const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { ChalkAdvanced } = require('chalk-advanced');

require("dotenv").config();

module.exports = async (client) => {
  const commands = client.commands.map(cmd => cmd.data.toJSON());

  const CLIENT_ID = client.user.id;

  const rest = new REST({
    version: "10",
  }).setToken(process.env.TOKEN);

  (async () => {
    try {
      if (process.env.STATUS === "PRODUCTION") { // If the bot is in production mode it will load slash commands for all guilds
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands,
        });
        console.log(ChalkAdvanced.green("Successfully registered commands globally"));

      } else {
        await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID),
          {
            body: commands,
          }
        );

        console.log(ChalkAdvanced.red("Successfully registered commands locally"));
      }
    } catch (err) {
      if (err) console.error(err);
    }
  })();

  client.embeds();

  client.user.setPresence({
    activities: [{ name: `${process.env.STATUSBOT}` }],
    status: "dnd",
  });

  console.log(ChalkAdvanced.blue('[BOT] Ready.'));
};
