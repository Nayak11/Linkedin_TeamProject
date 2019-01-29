const router = require('express').Router();
var {applicantProfiles} = require('../models/applicantProfile');

router.get('/viewCount',(req,res) => {
    let email = req.query.email;
    applicantProfiles.findOne({
        email : email
    },{"email" : 1, "personalProfile.views" : 1 }, (error, results) => {
        if (error) {
            console.log("Error retrieving view count");
            res.writeHead(400, {
                'Content-type': 'text/plain'
            })
            res.end("Error retrieving view count");
        } else {
            console.log("Successfully retrieved view counts");
            res.writeHead(200, {
                'Content-type': 'application/json'
            })
            res.end(JSON.stringify(results));
        }
    })
})

module.exports = router;