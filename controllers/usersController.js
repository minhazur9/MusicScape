const express = require('express')
const router = express.Router()

const db = require('../models')


router.get('/', (req, res) => {

    db.User.find({}, (err, allUsers) => {
        if(err) return console.log(err);

        const context = {allUsers};
        res.render('users/index', context)
    })
    
})

module.exports = router