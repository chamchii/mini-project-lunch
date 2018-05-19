const express = require('express')
const Person = require('./models/Person')

const router = express.Router()

router.get('/people', (req, res) => {
    Person.find(function(err, people){
        if(err) return res.status(500).send({error: 'database failure'});
        res.json(people);
    })
})

router.post('/people', (req, res) => {
    Person.find({name: req.body.name}, (err, people) => {
        if (people.length) {
            res.send('Name exists already')
        } else {
            let person = new Person();
            person.name = req.body.name;
            person.save(function(err){
                if(err){
                    console.error(err);
                    res.json({result: 0});
                    return;
                }
                res.json({result: 1});
            });
        }
    })
    
})

module.exports = router
