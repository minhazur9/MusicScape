const express = require('express')
const app = express();
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')



require('dotenv').config()
const PORT = process.env.PORT || 4000


app.set('view engine', 'ejs')


const ctrl = require('./controllers');



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))


app.use(morgan('tiny'))

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    const context = {loggedIn: req.session.user}
    console.log(context);
    res.render('index',context)
    
})



app.use('/users', ctrl.users);
app.use('/playlists', ctrl.playlists);
app.use('/songs', ctrl.songs);

app.use('*', (req, res) => {
  const context = {loggedIn: req.session.user};
    res.render('404',context);
  });



app.listen(PORT, () => console.log("Server is running "))
