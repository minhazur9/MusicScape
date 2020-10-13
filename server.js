const express = require('express')
const app = express();
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')
const db = require('./models')



const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => db.User.findOne({email : email}, (err, foundUser) =>{
        if(err) return err;
        return foundUser
    })
    
)


require('dotenv').config()
const PORT = process.env.PORT || 4000


app.set('view engine', 'ejs')


const ctrl = require('./controllers');
const { users } = require('./controllers');



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(morgan('tiny'))

app.use(methodOverride('_method'));





app.get('/', (req, res) => {
    res.render('index')
})



app.use('/users', ctrl.users);
app.use('/playlists', ctrl.playlists);

app.use('*', (req, res) => {
    res.render('404');
  });



app.listen(PORT, () => console.log("Server is running "))