const express = require('express')
const router = express.Router()
const db = require('../models')



//GET INDEX
router.get('/', (req, res) => {

    db.User.find({}, (err, allUsers) => {
        if(err) return console.log(err);

        const context = {allUsers};
        res.render('users/index', context)
    })
    
})

//GET NEW

router.get('/new', (req, res) => {
    res.render('users/new')
})

//GET SHOW
router.get('/:userId', (req, res) => {

    db.User.findById(req.params.userId)
    .populate('playlists')
    .exec( (err, foundUser) => {
        if(err) return console.log(err);
        console.log('foundUser', foundUser)

        const context = {
            user : foundUser
        }
        res.render('users/show', context)
    })
})

module.exports = router