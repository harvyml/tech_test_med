
/**
 * Compares and returns an error if:
 * 1. The password and password_validation don't match
 * 2. The password doesn't have at least one number
 * 3. the password is 
 * @param {string} password 
 * @param {string} password_validation 
 */
function password_validate(password, password_validation){
    if(password != password_validation){
        return {err: {message: "Please check that the 'password' and 'password validation' fields match"}, okay: false}
    }else if(password.length < 7){
        return {err: {message: "Your password must have at least seven characters"}, okay: false}
    }
    return {okay: true}
}


function parse_date_to_ms(date){
    date = Date.parse(date)
    return date
}

function from_ms_to_date_format(ms){
    let date = new Date(ms)
    return date.toDateString()
}

module.exports = {password_validate, parse_date_to_ms, from_ms_to_date_format}