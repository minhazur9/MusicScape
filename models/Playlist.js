const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    songs : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
    genre: {
        type: String
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true})

const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist