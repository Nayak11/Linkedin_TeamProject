var router = require('express').Router();
var { connections } = require('../models/connections');

router.put('/acceptConnection', function (req, res) {
    console.log("Inside  Accept connection : ");
    if(req.body.status==1){

    }
    console.log(req.body)
    connections.updateOne({ from: req.body.from, to:req.body.to }, { $set: { status: req.body.status } }, { upsert: true }, function (err, result) {
        if (err) {
            console.log("Error accepting connection");
            console.log(err)
            res.sendStatus(400).end();
        }
        else if (result) {
            console.log("connection accepted! ", result);
            connections.updateOne({ from: req.body.to, to:req.body.from }, { $set: { status: req.body.status } }, { upsert: true }, function (err, result) {
                if (err) {
                    console.log("Error accepting connection");
                    console.log(err)
                    
                }
                else if (result) {
                    console.log("connection accepted! ", result);
                    
                }
            res.sendStatus(200).end();
        })}
    })
})

router.put('/declineConnection', function (req, res) {
    console.log("Inside  Accept connection : ");
    console.log(req.body)
    connections.updateOne({ from: req.body.from, to:req.body.to }, { $set: { status: req.body.status } }, { upsert: true }, function (err, result) {
        if (err) {
            console.log("Error accepting connection");
            console.log(err)
            res.sendStatus(400).end();
        }
        else if (result) {
            console.log("connection Declined! ", result);
            res.sendStatus(200).end();
        }
    })
})

router.post('/checkConnection', function (req, res) {
    console.log("Inside  Check connection : ");
    console.log(req.body);
    connections.findOne({$and: [{ from: req.body.from, to:req.body.to}]}, function (err, result) {
        if (err) {
            console.log("Error accepting connection");
            console.log(err)
            res.sendStatus(400).end(result);
        }
        else if (result) {
            console.log("Connection Already established! ", result);
            res.writeHead(200)
            res.end(JSON.stringify(result));
        }
        else{
            console.log("Not Connected!");
            res.sendStatus(400).end();
        }
    })
})

router.post('/requestConnection', function (req, res) {
    console.log("Inside  Requesting connection: ");
    console.log(req.body)
    var connection = new connections({
        from: req.body.from,
        to: req.body.to,
        status: 0,
    });
    connection.save().then((connection) => {
        console.log("Connection Requested! ", connection);
        res.sendStatus(200).end();
    }, (err) => {
        console.log("Error Requesting for connection");
        //console.log(err)
        res.sendStatus(400).end();
    })
})

module.exports = router;