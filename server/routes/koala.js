var express = require('express');
var router = express.Router();
var pool = require('../modules/pool.js')

router.get('/', function (req, res) {
    console.log('koala get was hit');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        done();
        if (errorConnectingToDatabase) {
            console.log('Error connecting to DataBase', errorConnectingToDatabase);
            res.sendStatus(500)
        } else {
            client.query('SELECT * FROM koala;', function (errorMakingQuery, result) {
                //done();
                if (errorMakingQuery) {
                    console.log('Error making database query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });

        }
    });
});

router.post('/', function (req, res) {
    console.log('koala post hit');
    pool.connect(function (errorConnectingToDatabase, client, done) {
        done();
        if (errorConnectingToDatabase) {
            console.log('error connecting to db:', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // query like this; INSERT INTO koala (name, gender, age, ready_for_transfer, notes) VALUES ('jeff','F','3','N','likes beef');
            client.query('INSERT INTO koala (name, gender, age, ready_for_transfer, notes) VALUES ($1,$2,$3,$4,$5)',
                [req.body.name, req.body.gender, req.body.age, req.body.ready_for_transfer, req.body.notes], function (errorMakingQuery, result) {
                    if(errorMakingQuery){
                        console.log('error making query', errorMakingQuery);
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(201);
                    }
                })
        }
    })
});

module.exports = router;