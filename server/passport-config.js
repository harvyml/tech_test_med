const passport = require("passport")
var flash = require('connect-flash');
const LocalStrategy = require("passport-local").Strategy
const User = require("./models/user.js");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const { password_validation } = require("./modules")

passport.serializeUser((user, done) => {
    done(null, user._id)
})
passport.deserializeUser(async (_id, done) => {
    const user = await User.findById(_id)
    done(null, user)
})

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        return done(null, false)
    }
    if (!user.comparePassword(password)) {
        return done(null, false)
    }
    done(null, user)
}))


passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email })
    const password_state = password_validation(password, req.body.password_validation)
    if (!password_state.okay) {
        return done(null, false, password_state.err)
    }

    if (user) {
        return done(null, false, { message: "user already exists" })
    }

    let hashedPassword = await bcrypt.hash(req.body.password, 10)
    var new_user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: email,
        role: req.body.role,
        password: hashedPassword
    })
    new_user.save().then(user => {
        return done(null, user)
    }).catch(err => {
        console.log(err)
        return done(err, false, { message: err.message })
    })
}
))