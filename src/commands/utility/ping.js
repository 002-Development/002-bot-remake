const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the bot's ping status"),

  async execute(interaction, client) {
    const pingembed = client.embeds.default
    .setTitle(":ping_pong:  Pong!")
    .addFields(
      {
        name: "**Api** latency",
        value: `> **${Math.round(client.ws.ping)}**ms`,
        inline: false,
      }
    )

    await interaction.reply({
      embeds: [pingembed]
    });
  },
};
