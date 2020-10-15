const express = require('express')
const router = express.Router()
const db = require('../models')


// New Route
router.get('/:playlistId/new', (req, res) => {
    db.Playlist.findById(req.params.playlistId, (err, foundPlaylist) => {
        if (err) return console.log(err);
        const context = {
            foundPlaylist,
            loggedIn: req.session.user,
        }
        res.render('songs/new', context);
    })
})

// Post Route
router.post('/', (req, res) => {
    db.Song.create(req.body, (err, newSong) => {
        if (err) return console.log(err);
        db.Playlist.findById(req.body.playlist, (err, foundPlaylist) => {
            if (err) return console.log(err);
            foundPlaylist.songs.push(newSong._id);
            foundPlaylist.save((err, savedSong) => {
                if (err) return console.log(err);
                res.redirect(`/playlists/${foundPlaylist._id}`);
            })
        })
    })
})


// Show Route


module.exports = router;
