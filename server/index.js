const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const fs = require("fs")
const bodyParser = require("body-parser")
const session = require("express-session")
const passport = require("passport")
const app = express()
app.use("/public", express.static("./public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
const router = express.Router()


//external
const api = require("./api")
// const routes = require("./routes")
const indexHTML = fs.readFileSync("./public/index.html", "utf8")
const registerHTML = fs.readFileSync("./public/register.html", "utf8")
const loginHTML = fs.readFileSync("./public/login.html", "utf8")
const attendantHTML = fs.readFileSync("./public/attendant.html", "utf8")
const speakerHTML = fs.readFileSync("./public/speaker.html", "utf8")

//external modules
const {isAuth} = require("./modules")
//using api route
// app.use("/", routes)
//session configuration
app.use(session({ 
    secret: process.env.SECRET_WORD_FOR_SESSION_HANDLING,
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize())
app.use(passport.session())
app.use("/api", api)
app.use("/", router)

router.get("/", (req, res) => {
    res.send(indexHTML)
})


router.get("/login", (req, res) => {
    res.send(loginHTML)
})

router.get("/register", (req, res) => {
    res.send(registerHTML)
})

router.get("/user", isAuth, (req, res) => {
    //role 0: speaker
    //role 1: attendant
    if(req.user.role == 0){
        res.send(speakerHTML)
    }else if(req.user.role == 1){
        res.send(attendantHTML)
    }
})

app.listen(process.env.PORT || 3000, () => console.log("listening on port 3000"))
