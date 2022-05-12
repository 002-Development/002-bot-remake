const { MessageEmbed } = require("discord.js");

class defaultEmbed extends MessageEmbed {
    constructor(client) {
        var defaultEmbed = super()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.avatarURL() })
        .setColor('#5865f4')
        .setTimestamp();

        return defaultEmbed;
    }
}

class errorEmbed extends MessageEmbed {
    constructor(client) {
        var errorEmbed = super()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.avatarURL() })
        .setColor('ff4d4d')
        .setTimestamp();

        return errorEmbed;
    }
}

module.exports = {
    defaultEmbed,
    errorEmbed
}