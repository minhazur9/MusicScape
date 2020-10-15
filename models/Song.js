const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    artist: {
        type: String,
        required: true,
    },
    playlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
    }
}, {timestamps: true})

const Song = mongoose.model('Song', songSchema)

module.exports = Song