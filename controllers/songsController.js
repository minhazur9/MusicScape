const express = require('express')
const router = express.Router()
const db = require('../models')


// New Route
router.get('/new', (req, res) => {
    db.Song.findById(req.params.playlistId, (err, foundSong) => {
        if (err) return console.log(err);
        const context = {
            foundSong,
            loggedIn: req.session.user
        };
        res.render('songs/new', context);
    })
})


// Show Route

