const { readdirSync } = require("fs");

module.exports = (client, interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    
    try {
      command.execute(interaction, client);
    } catch (err) {
      if (err) console.error(err);
      interaction.reply({
        embeds: [client.embeds.error.setDescription('An error occurred while executing that command.')],
        ephemeral: true,
      });
    }
  }

  
};
