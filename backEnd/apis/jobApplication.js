var router = require('express').Router();
const Busboy = require('busboy');
const AWS = require('aws-sdk');
var uploadToS3 = require('../AWS_s3/s3BucketOperations')
var { jobApplications } = require('../models/jobApplication');

router.post('/jobApplication/apply', function (req, res) {
    console.log("Inside job application");
    console.log("Received files: ", req.files)
    // var busboy = new Busboy({ headers: req.headers });
    var jobApplication = new jobApplications({
        ...req.body,
        resume: req.body.email
    });
    // busboy.on('finish', function () {
    //     //console.log('Upload finished');
    //     const file = req.files.resume;
    //     console.log("Resume picked", file.name);
    //     // Begins the upload to the AWS S3
    //     fileType = "resume";
    //     uploadToS3.uploadToS3(file, req.body.email, fileType);
    // });
    // req.pipe(busboy);
    jobApplication.save().then((result) => {
        console.log("jobApplication inserted: ", result);
        res.sendStatus(200).end();
    }, (err) => {
        console.log("Error doing the job Application");
        console.log(err)
        res.sendStatus(400).end();
    })

});

module.exports = router;
