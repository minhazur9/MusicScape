const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    artist : {
        type: String,
    }, 
    playlists : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Playlist"
    }]
    
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = User