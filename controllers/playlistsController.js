const express = require('express')
const router = express.Router()

const db = require('../models')

// Redirect to New Playlist
router.get('/', (req, res) => {
    db.Playlist.find()
        .populate('user')
        .exec((err, allPlaylists) => {
            if (err) return console.log(err);
            const context = {
                allPlaylists,
                loggedIn: req.session.user
            }
            res.render('playlists', context)
        })
})

// New Playlist 
router.get('/new', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login')
    }
    db.User.find({}, (err, allUsers) => {
        if (err) return console.log(err);
        const context = {
            allUsers,
            loggedIn: req.session.user
        }
        res.render('playlists/new', context);
    })
})

// Create Playlist
router.post('/', (req, res) => {
    if (req.body.name.length < 1) {
        res.redirect('/playlists/new')
        alert("Name Required")
    }
    db.Playlist.create(req.body, (err, newPlaylist) => {
        if (err) return console.log(err);
        db.User.findById(req.body.user, (err, foundUser) => {
            if (err) return console.log(err);
            foundUser.playlists.push(newPlaylist._id);
            foundUser.save((err, savedUser) => {
                if (err) return console.log(err);
                res.redirect(`../users/${foundUser._id}`);
            })
        })
    })
})

// Show Playlist
router.get('/:playlistId', (req, res) => {
    const playlistId = req.params.playlistId;
    db.Playlist.findById(playlistId)
        .populate('user')
        .populate('songs')
        .exec((err, foundPlaylist) => {
            if (err) {
                console.log(err);
                return res.redirect('/404');
            }
            if (!req.session.user) {
                const context = {
                    foundPlaylist,
                    loggedIn: req.session.user,
                    userLoggedIn: false
                }
                res.render('playlists/show', context);
            }
            else {
                const context = {
                    foundPlaylist,
                    loggedIn: req.session.user,
                    userLoggedIn: req.session.user._id == foundPlaylist.user._id
                };
                res.render('playlists/show', context);
            }

        });
});

// Edit Playlist
router.get('/:playlistId/edit', (req, res) => {
    db.Playlist.findById(req.params.playlistId, (err, foundPlaylist) => {
        if (err) {
            console.log(err);
            return res.redirect('/404');
        }
        const context = {
            foundPlaylist,
            loggedIn: req.session.user
        };
        res.render('playlists/edit', context);
    })

})
// Update Playlist
router.put('/:playlistId', (req, res) => {
    db.Playlist.findByIdAndUpdate(
        req.params.playlistId,
        req.body,
        (err, updatedPlaylist) => {
            if (err) return console.log(err);
            res.redirect(`/playlists/${updatedPlaylist._id}`)
        })
})

// Delete Playlist
router.delete('/:playlistId', (req, res) => {
    const playlistId = req.params.playlistId;
    db.Playlist.findByIdAndDelete(playlistId, (err, deletedPlaylist) => {
        if (err) return console.log(err);
        db.Song.deleteMany({ _id: { $in: deletedPlaylist.songs } }, (err, result) => {
            db.User.findOne({ playlists: playlistId }, (err, foundUser) => {
                if (err) return console.log(err);
                foundUser.playlists.remove(playlistId);
                foundUser.save((err, updatedUser) => {
                    if (err) return console.log(err);
                    res.redirect('/playlists')
                })
            })

        })
    })
})


module.exports = router