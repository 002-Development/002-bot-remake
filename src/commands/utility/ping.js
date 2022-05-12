const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the bot's ping status"),

  async execute(interaction, client) {
    const pingembed = new client.embeds.default(client)
    .setTitle(":ping_pong:  Pong!")
    .addField("**Api** latency", `> **${Math.round(client.ws.ping)}**ms`, false)

    await interaction.reply({
      embeds: [pingembed]
    });
  },
};
