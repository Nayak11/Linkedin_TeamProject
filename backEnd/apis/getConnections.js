var router = require('express').Router();
var { connections } = require('../models/connections');
//var kafka = require('../kafka/client');

router.post('/getConnections', function (req, res) {

    console.log("Inside Get connections : ");


    console.log(req.body);
    connections.find({
        to:req.body.email,
    }, (err, results) => {
        if(err){
            console.log("Error occured")
            res.json({ status: "error", msg: "System error" })
            res.sendStatus(400).end();
        } else {
            console.log("Got results in node kf")
            res.writeHead(200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })    

    //status:1--> connected
//status:0--> In progress
//status:2--> Not accepted

    // kafka.make_request('getConnections', req.body, (err, results) => {
    //     console.log("In node kf --> Post Message Handler")
    //     if (err) {
    //         console.log("Error occured")
    //         res.json({ status: "error", msg: "System error" })
    //         res.sendStatus(400).end();
    //     }
    //     else {
    //         console.log("Got results in node kf")
    //         res.writeHead(200, {
    //             'Content-Type': 'application/json'
    //         })
    //         res.end(JSON.stringify(results));
    //     }
    // })    
})

module.exports = router;