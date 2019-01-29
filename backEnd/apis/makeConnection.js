var router = require('express').Router();
var { connections } = require('../models/connections');

router.post('/makeConnection', function (req, res) {

    console.log("Inside  make connection : ");

    connections.updateOne({ from: req.body.from, to:req.body.to }, { $set: { ...req.body } }, { upsert: true }, function (err, result) {
        if (err) {
            console.log("Error in making connection", err);
            res.sendStatus(400).end();
        }
        else if (result) {
            console.log("connection saved ", result);
            res.sendStatus(200).end();
        }
    })
})

module.exports = router;