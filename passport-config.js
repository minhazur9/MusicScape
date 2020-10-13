const LocalStrategy = require('passport-local').Strategy

const db = require('./models')



function getUserByEmail(email) { db.User.findOne({email : email}, (err, foundUser) =>{
    if(err) return err;
    return foundUser
})
}




function initialize(passport, getUserByEmail) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
    if (user == null) {
        return done(null, false, {message: "No user with that email and password"})
    }

    try {
        if(password === user.password) {
            return done(null, user)
        }else {
            return done(null, false, {message: "No user with that email and password"})
        }
    }catch (e){
        return done(e)
    }
    } 
passport.use(new LocalStrategy({usernameField: 'email'},
authenticateUser))
passport.serializeUser((user, done) => {})
passport.deserializeUser((id, done) => { })
}

module.exports = initialize