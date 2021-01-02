const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const user = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    email: String,
    role: Number,
    password: String
})

user.methods.comparePassword = function(password){
    try {
        return bcrypt.compareSync(password, this.password);
    }catch(err){
        return err.message
    }
}


module.exports = mongoose.model("user", user)