const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const {} = require("./modules")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()

app.use("/public", express.static("/public/assets"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))



mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.get("/", cors(), (req, res) => {
    res.send("First things first!")
})

module.exports = app
