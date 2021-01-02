const mongoose = require("mongoose")
const Schema = mongoose.Schema

const conference = new Schema({
    _id: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId, //the userId is the _id of the user who is the owner of the conference
    name: String,
    date: Number,
    location: String,
    quota: Number,
    state: Boolean,
    attendants: [
        {
            name: String,
            userId: Schema.Types.ObjectId,
            email: String
        }
    ]
}, {collection: "conferences"})

module.exports = mongoose.model("conference", conference)