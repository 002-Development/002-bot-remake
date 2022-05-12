require("dotenv").config();

const { ChalkAdvanced } = require("chalk-advanced");
const { connect } = require('mongoose');

module.exports = async (client) => {

    /* Create a new Database Connection */
    let dbConnection = await connect(process.env.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    /* If exists a Connection load Database Models */

    if(dbConnection && dbConnection.connection.readyState == 1) {
        console.log(ChalkAdvanced.red("[DB] Connected."));
      
        client.database = {
            example: require('./models/example'),
        };
      
        if(client.database.example) console.log(chalk.red("[DB][MODEL] Loaded example."));
    };
}