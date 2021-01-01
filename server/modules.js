const mongoose = require("mongoose")
const User = require("./models/user")
const Conference = require("./models/conference")

/**
 * Compares and returns an error if:
 * 1. The password and password_validation don't match
 * 2. The password doesn't have at least one number
 * 3. the password is 
 * @param {string} password 
 * @param {string} password_validation 
 */
function password_validation(password, password_validation){
    if(password != password_validation){
        return {err: {message: "Please check that the 'password' and 'password validation' fields match"}, okay: false}
    }else if(password.length < 6){
        return {err: {message: "Your password must have at least seven characters"}, okay: false}
    }
    return {okay: true}
}


/**
 * orders an array by its field 'nombre', returns a promise
 * @param {*} arr 
 */
function order_by_name(arr){
    var ordered = arr.sort((a, b) => a.nombres.localeCompare(b.nombres, 'es', { sensitivity: 'base' }))
    return ordered
}



//=============== db methods ===================
function create_conference(conference, userId){
    const { name, date, location, quota} = conference
    var new_conference = new Conference({
        _id: new mongoose.Types.ObjectId(),
        userId: userId,
        name,
        date,
        location,
        quota,
        state: true
    })

    return new_conference.save()
}


function isAuth(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

//database queries
module.exports = {
    password_validation,
    order_by_name,
    create_conference,
    isAuth
}