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
router.get('/:songId/show', (req, res) => {
    db.Song.findById(req.params.songId, (err, foundSong) => {
        if (err) return console.log(err);
        db.Playlist.findById(foundSong.playlist, (err, foundPlaylist) => {
            if (err) return console.log(err);
            db.User.findById(foundPlaylist.user, (err, foundUser) => {
                if (err) return console.log(err);
                if (!req.session.user) {
                    const context = {
                        foundSong,
                        loggedIn: false,
                    }
                    res.render('songs/show', context)
                }
                else {
                    const ownerUser = foundUser;
                    const context = {
                        foundSong,
                        loggedIn: req.session.user.name === ownerUser.name,
                    }
                    res.render('songs/show', context)
                }
            })
        })
    })
}) 

// Delete Route
router.delete('/:songId', (req, res) => {
    const songId = req.params.songId;
    db.Song.findByIdAndDelete(songId, (err, foundSong) => {
        if (err) return console.log(err);
        db.Playlist.findOne(foundSong.playlist, (err, foundPlaylist) => {
            if (err) return console.log(err);
            foundPlaylist.songs.remove(songId);
            foundPlaylist.save((err) => {
                if (err) return console.log(err);
                res.redirect('/playlists')
            })

        })
    })
})




// Show Route
module.exports = router;

