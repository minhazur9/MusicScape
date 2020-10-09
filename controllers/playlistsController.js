const express = require('express')
const router = express.Router()

const db = require('../models')


// New Playlist 
router.get('/new', (req,res) => {
    res.render('playlists/new');
})


// Show Playlist
// router.get('/:playlistId', (req, res) => {
//     const playlistId = req.body.params.playlistId;
//     db.Playlist.find(playlistId)
//         .populate('users')
//         .exec((err, foundPlaylist) => {
//         if(err) return console.log(err);
//         res.render(`playlists/${playlistId}`);
//     });
// });
module.exports = router