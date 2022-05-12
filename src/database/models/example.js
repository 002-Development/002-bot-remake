var { model, Schema } = require("mongoose");

module.exports = model("example", new Schema({
    userid: {
        type: String,
        unique: true
    },
    created_at: {
        type: Date,
        default: new Date()
    },
    bio: {
        type: String,
        default: "No bio yet"
    }
}))