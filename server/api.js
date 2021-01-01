const express = require("express")
const dotenv = require("dotenv").config()
const cors = require("cors")
const {} = require("./modules")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const app = express()
const session = require("express-session")
const passport = require("passport")
const initializePassport = require("./passport-config").default;
const flash = require("express-flash")
const {create_conference} = require("./modules")

app.use("/public", express.static("/public/assets"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
//session configuration
app.use(session({ 
    secret: process.env.SECRET_WORD_FOR_SESSION_HANDLING,
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize())
app.use(passport.session())
//flash configuration
app.use(flash())


mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})



//get requests
app.get("/user", (req, res) => {
    res.json(req.user)
})

//session handling
app.post("/login", passport.authenticate("local-signin", {
    successRedirect: "/api/user",
    successMessage: "Welcome!",
    successFlash: false,
	failureRedirect: "/api?err=true",
	failureFlash: true
}))
app.post("/register", passport.authenticate("local-signup", {
    successRedirect: "/api/user",
	failureRedirect: "/api/err",
	failureFlash: true
}))

app.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/login")
})
//post requests
app.post("/conference/create", (req, res) => {
    console.log(req.body)
    create_conference(req.body, req.user._id).then(snap => {
        res.json(snap)
    }).catch(err => res.json(err))
})

app.post("/conference/delete", isAuth, (req, res) => {

})

app.post("/user/register", )

app.post("/conference/enter", isAuth, (req, res) => {

})

app.post("/conference/withdraw", isAuth, (req, res) => {

})

function isAuth(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}



module.exports = app
