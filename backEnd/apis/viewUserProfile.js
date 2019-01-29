var router = require('express').Router();
var { applicantProfiles } = require('../models/applicantProfile');
var AWS_operations = require('../AWS_s3/s3BucketOperations');

router.get('/userProfile', (req, res) => {
    console.log("Inside user profile List GET request");
    let email = req.query.email;
    applicantProfiles.find({
        email
    }, (err, results) => {
        if (err) {
            console.log("Error finding mongo results for User Profile");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error finding mongo results for User Profile");
        } else {
            console.log("Successfully retrieved User Profile");
            res.writeHead(200, {
                'Content-type': 'application/json',
            })
            console.log(results)
            res.end(JSON.stringify(results));
        }
    })
})

router.get('/userProfile/getProfilePic', (req, res) => {
    console.log("Inside get profile pic");
    let email = req.query.email;
    console.log(email);
    if (email !== null) {
        console.log("sending request to AWS S3 operations");
        let fileType = "profilePic";
        AWS_operations.downloadFromS3(email, fileType, res);
    } else {
        res.sendStatus(400).end("empty email");
    }
})

router.get('/userProfile/getResume', (req, res) => {
    console.log("Inside get Resume");
    let email = req.query.email;
    console.log(email);
    if (email !== null) {
        console.log("sending request to AWS S3 operations");
        let fileType = "resume";
        try {
            AWS_operations.downloadFromS3(email, fileType, res);
        } catch (e) {
            console.log("fetching from AWS failed");
        }
    } else {
        res.sendStatus(400).end("empty email");
    }
})

module.exports = router;