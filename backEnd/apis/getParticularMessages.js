const router = require('express').Router();
var Message = require('../models/messages');

router.get('/messages/user', (req, res) => {
    console.log("Inside getParticularMessages GET request");
    let participantsQuery = [req.query.participant1, req.query.participant2];
    console.log(participantsQuery);
    Message.findOne({
        participants : {$all : participantsQuery}
    }, (err, results) => {
        if(err){
            console.log("Error retrieving messages");
            res.writeHead(400, {
                'Content-type' : 'text/plain'
            })
            res.end("Error retrieving messages");
        } else {
            console.log("Successfully retrieved messages");
            res.writeHead(200, {
                'Content-type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })
})

module.exports = router;