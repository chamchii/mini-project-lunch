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
            res.json({result: 0, error: 'Name already exists'});
        } else {
            let person = new Person();
            person.name = req.body.name;
            person.save(function(err, data){
                if(err){
                    console.error(err);
                    res.json({result: 0, error: 'Post Failed'});
                    return;
                }
                res.json({result: 1, data: data});
            });
        }
    })
})

router.delete('/people', (req, res) => {
    Person.remove({}, err => {
        if (err) {
            res.status(500).send('RemoveAll Failed');
        } else {
            res.send('success');
        }
    })
})

router.delete(`/person/:id`, (req, res) => {
    Person.remove({ _id: req.params.id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });
        console.log('output', output);
        res.status(204).end();
    })
})

module.exports = router
