const { Client, Collection, MessageEmbed } = require('discord.js');
const { readdirSync, readdir } = require("fs");
const { ChalkAdvanced } = require('chalk-advanced');
const { defaultEmbed, errorEmbed } = require('./embed');

module.exports = class ZeroTwo_Client extends Client {
    constructor(options) {
        super(options || {});

        /* It's creating a new collection for the commands. */
        this.commands = new Collection();

        /* Loading the database */
        this.loadDatabase()
        /* Loading the commands */
        this.loadCommands()
        /* Loading the events */
        this.loadEvents()
    };

    login() {
        super.login(process.env.TOKEN)
    };

    loadDatabase() {
        require('../database/index')(this);
    };

    loadCommands() {
        readdirSync('./src/commands').forEach(dirs => {
        	const commands = readdirSync(`./src/commands/${dirs}/`).filter(f => f.endsWith('.js'));

        	for (const file of commands) {
        		const cmd = require(`../commands/utility/ping`);

        		if (!cmd.execute) throw new TypeError(ChalkAdvanced.red(`[ERROR][CMD]: execute function is required for commands! (${file})`));
        		if (!cmd.data.name) throw new TypeError(ChalkAdvanced.red(`[ERROR][CMD]: name is required for commands! (${file})`));
        		if (cmd.data.name.trim() === '') throw new TypeError(ChalkAdvanced.red(`[ERROR][CMD]: name cannot be empty! (${file})`));

        		this.commands.set(cmd.data.name, cmd);

        		// console.log(ChalkAdvanced.yellow(`[CMD][${dirs.toUpperCase()}]: Loaded ${cmd.data.name}.`));
        	}
        });
    };

    loadEvents() {
        readdir("./src/events/", (err, files) => {
          if (err) return console.error(err); 

          files.forEach((file) => {
            const event = require(`../events/${file}`);
            let eventName = file.split(".")[0];
            this.on(eventName, event.bind(null, this));
          });
        });
    };

    embeds() {
        this.embeds = {
            default: defaultEmbed,
            error: errorEmbed
        }
    };
};