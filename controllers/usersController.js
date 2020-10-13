const express = require('express')
const router = express.Router()
const db = require('../models')
const passport = require('passport')




//GET INDEX
router.get('/', (req, res) => {

    db.User.find({}, (err, allUsers) => {
        if(err) return console.log(err);

        const context = {allUsers};
        res.render('users/index', context)
    })
    
})


//GET SIGN IN

router.get('/signin', (req, res) => {
    
    res.render('users/signin')
    
})

router.post('/signin', passport.authenticate('local', {
    sucessRedirect: '/users',
    failureRedirect: '/users/signin',
    failureFlash: true
    
}
))


//GET NEW

router.get('/new', (req, res) => {
    res.render('users/new')
})

//POST NEW

router.post('/', (req, res) => {


    db.User.create(req.body, (err, newUser) => {

        // if(err) return console.log(err);
        // console.log(newUser)
        try {
            
        res.redirect(`/users/${newUser._id}`)
        } catch{
            res.redirect('/users/new')
        }
    })
})


//GET EDIT

router.get('/:userId/edit', (req, res) => {
    db.User.findById(req.params.userId, (err, foundUser) => {
        if(err) return console.log(err)

        const context = {
            user: foundUser
        }
        res.render('users/edit', context)
    })
})

//PUT EDIT

router.put('/:userId', (req, res) => {

    db.User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {new: true},
        (err, updatedUser) => {
            if(err) return console.log(err);

            res.redirect(`/users/${updatedUser._id}`)
        }
    )
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

//DELETE 

router.delete('/:userId', (req, res)=> {
    db.User.findByIdAndDelete(req.params.userId, (err, deletedUser) =>{
        if(err) return console.log(err)

        db.Playlist.deleteMany({_id : { $in : deletedUser.playlists}}, (err, result) => {
            if(err) return console.log(err)

            console.log('deleted these playlists', result)
            res.redirect('/users')
        })
    })
})

module.exports = router