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

async function cancel_conference(conference_id, userId){
    var condition = await Conference.findOne({_id: conference_id})
    if(condition.attendants.length > 0){
        return condition
    }
    return Conference.findOneAndUpdate({_id: conference_id, userId}, {state: false})
}

function activate_conference(conference_id, userId){
    return Conference.findOneAndUpdate({_id: conference_id, userId}, {state: true})
}

function delete_conference(conference_id, userId){
    return Conference.findOneAndRemove({_id: conference_id, userId})
}


function isAuth(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}


async function get_conferences(userId){
    var result = await Conference.find({userId: userId})
    return result
}

async function get_conference(_id){
    var result = await Conference.findOne({_id: _id})
    return result
}

async function get_attendant_attending_conferences(userId){
    var result = await Conference.find({attendants: {$elemMatch: {userId: userId}}, state: true})
    return result
}

async function get_attendant_not_attending_conferences(userId){
    var result = await Conference.find({attendants: {$not: {$elemMatch: {userId: userId}}}, state: true})
    return result
}
async function attend(_id, userId, attendant_name, attendant_email){
    var condition = await Conference.findOne({_id: _id})
    if(condition.quota < 1){
        return {err: {message: "There are no remaining spots in this conference, sorry"}}
    }
    var exists = await Conference.findOne({_id: _id, attendants: {userId: userId}})
    if(!exists){
        var result = await Conference.findOneAndUpdate({_id: _id}, {$push: {attendants: {userId: userId, name: attendant_name, email: attendant_email}}, $inc: {quota: -1}}, {upsert: true})
        return result
    }
    return exists
}
async function cancel_attendance(_id, userId){
    var result = await Conference.findOneAndUpdate({_id: _id}, {$pull: {attendants: {userId: userId}}, $inc: {quota: 1}})
    return result
}

async function get_user(_id){
    var result = await User.findOne({_id})
    return result
}

//database queries
module.exports = {
    password_validation,
    order_by_name,
    create_conference,
    isAuth,
    get_conferences,
    get_conference,
    get_user,
    cancel_conference,
    activate_conference,
    delete_conference,
    get_attendant_attending_conferences,
    get_attendant_not_attending_conferences,
    attend,
    cancel_attendance
}