const express = require('express')
const Person = require('./models/Person')

const router = express.Router()

router.get('/people', (req, res) => {
    Person.find(function(err, books){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(books);
    })
})

module.exports = router
