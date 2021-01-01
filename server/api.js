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
const {
    create_conference, 
    get_conferences, 
    get_attendant_attending_conferences, 
    get_attendant_not_attending_conferences, 
    cancel_conference, delete_conference, 
    activate_conference, 
    attend,
    cancel_attendance,
    isAuth
} = require("./modules")

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
    useUnifiedTopology: true,
    useFindAndModify: false
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

app.get("/speaker/conferences", (req, res) => {
    get_conferences(req.user._id).then(snap => {
        res.json(snap)
    }).catch(err => {
        res.json(err)
    })
})

app.get("/attendant/conferences/attending", (req, res) => {
    get_attendant_attending_conferences(req.user._id).then(snap => {
        res.json(snap)
    }).catch(err => {
        res.json(err)
    })
})

app.get("/attendant/conferences/notattending", (req, res) => {
    get_attendant_not_attending_conferences(req.user._id).then(snap => {
        res.json(snap)
    }).catch(err => {
        res.json(err)
    })
})
//post requests
app.post("/conference/create", (req, res) => {
    create_conference(req.body, req.user._id).then(snap => {
        console.log(snap)
        res.json(snap)
    }).catch(err => {
        console.log(err)
        res.json(err)
    })
})

app.post("/conference/cancel", (req, res) => {
    cancel_conference(req.body._id, req.user._id).then(snap => {
        res.json({message: "okay"})
    }).catch(err => {
        res.json({message: "failed"})
    })
})

app.post("/conference/activate", (req, res) => {
    activate_conference(req.body._id, req.user._id).then(snap => {
        res.json({message: "okay"})
    }).catch(err => {
        res.json({message: "failed"})
    })
})

app.post("/conference/delete", isAuth, (req, res) => {
    delete_conference(req.body._id, req.user._id).then(snap => {
        res.json({message: "okay"})
    }).catch(err => {
        res.json({message: "failed"})
    })
})

app.post("/conference/attend", isAuth, (req, res) => {
    attend(req.body._id, req.user._id).then(snap => {
        res.json({okay: true})
    }).catch(err => {
        res.json({...err, okay: false})
    })
})

app.post("/conference/withdraw", isAuth, (req, res) => {
    cancel_attendance(req.body._id, req.user._id).then(snap => {
        res.json({okay: true})
    }).catch(err => {
        res.json({okay: false})
    })
})




module.exports = app
