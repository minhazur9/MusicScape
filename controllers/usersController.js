const express = require('express')
const router = express.Router()
const db = require('../models')

//GET INDEX
router.get('/', (req, res) => {
    db.User.find({}, (err, allUsers) => {
        if (err) return console.log(err);
        const context = {
            allUsers,
            loggedIn: req.session.user
        };
        res.render('users/index', context)
    })

})

//GET NEW

router.get('/new', (req, res) => {
    const context = {loggedIn: req.session.user}
    res.render('users/new',context)
})

// Login

router.get('/login', (req, res) => {
    const context = {
        loggedIn: req.session.user
    };
    res.render('users/login', context);
})

// Authenticate
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    db.User.findOne({ email: email, password: password }, (err, user) => {
        if (err) return console.log(err);
        if (!user) {
            console.log('wrong')
            return res.redirect('/users/login');
        }
        req.session.user = user;
        return res.redirect('/');

    })
})

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('../')
})

//POST NEW

router.post('/', (req, res) => {
    db.User.create(req.body, (err, newUser) => {
        if (err) return console.log(err);
        console.log(newUser)
        res.redirect(`/users/${newUser._id}`)
    })
})

//GET EDIT

router.get('/:userId/edit', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/404');
    }
    db.User.findById(req.params.userId, (err, foundUser) => {
        if (err) return console.log(err)

        const context = {
            user: foundUser,
            loggedIn: req.session.user
        }
        res.render('users/edit', context)
    })
})

//PUT EDIT

router.put('/:userId', (req, res) => {

    db.User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true },
        (err, updatedUser) => {
            if (err) return console.log(err);

            res.redirect(`/users/${updatedUser._id}`)
        }
    )
})

//GET SHOW
router.get('/:userId', (req, res) => {
    db.User.findById(req.params.userId)
        .populate('playlists')
        .exec((err, foundUser) => {
            if (err) return console.log(err);
            console.log('foundUser', foundUser)

            const context = {
                user: foundUser,
                loggedIn: req.session.user
            }

            res.render('users/show', context)
        })
})

//DELETE 

router.delete('/:userId', (req, res) => {
    db.User.findByIdAndDelete(req.params.userId, (err, deletedUser) => {
        if (err) return console.log(err)

        db.Playlist.deleteMany({ _id: { $in: deletedUser.playlists } }, (err, result) => {
            if (err) return console.log(err)

            console.log('deleted these playlists', result)
            res.redirect('/users')
        })
    })
})

module.exports = router