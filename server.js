const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const morgan = require('morgan')

require('dotenv').config()
const PORT = process.env.PORT || 4000


app.set('view engine', 'ejs')


const ctrl = require('./controllers')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static('public'))


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