var router = require('express').Router();
var { applicantProfiles } = require('../models/applicantProfile');
var { recruiterProfiles } = require('../models/recruiterProfile');
const Busboy = require('busboy');
const AWS = require('aws-sdk');
var AWS_operations = require('../AWS_s3/s3BucketOperations');


// Two ways of upserting the documents.
router.put('/applicant/updateProfile', function (req, res) {
    console.log("Inside Applicant update handler", req.body);
    applicantProfiles.updateOne({ email: req.body.email }, { $set: { ...req.body } }, { upsert: true }, function (err, result) {
        if (err) {
            console.log("Error updating the Profile information.");
            console.log(err)
            res.sendStatus(400).end();
        }
        else if (result) {
            console.log("Applicant Profile updated: ", result);
            res.sendStatus(200).end();
        }
    })
});

router.put('/applicant/updateProfile/updateViews', function (req, res) {
    console.log("Inside Profile views", req.body);
    console.log("........................................................................................................................................................................");
    applicantProfiles.updateOne({ email: req.body.email }, { $inc: { "personalProfile.views": 1 } }, function (err, result) {
        if (err) {
            console.log("Error updating the Profile views.");
            console.log(err)
            res.sendStatus(400).end();
        }
        else if (result) {
            console.log(" Profile  views updated: ", result);
            res.sendStatus(200).end();
        }
    })
});



router.post('/applicant/updateProfile/profilePicUpload', function (req, res) {
    console.log("inside profile pic upload", req.body);
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('finish', function () {
        //console.log('Upload finished');
        const file = req.files.profilePic;
        console.log("ImageUpload", file);
        // Begins the upload to the AWS S3
        fileType = "profilePic";
        AWS_operations.uploadToS3(file, req.body.email, fileType);
    });
    req.pipe(busboy);
    res.sendStatus(200).end('Profile pic updated');
});

router.post('/applicant/updateProfile/resumeUpload', function (req, res) {
    console.log("inside resume upload", req.body);
    var busboy = new Busboy({ headers: req.headers });
    busboy.on('finish', function () {
        //console.log('Upload finished');
        const file = req.files.resume;
        console.log("ResumeUpload", file);
        // Begins the upload to the AWS S3
        fileType = "resume";
        AWS_operations.uploadToS3(file, req.body.email, fileType);
    });
    req.pipe(busboy);
    res.sendStatus(200).end('Resume uploaded successfully !!!');
});

// router.put('/recruiter/updateProfile', function (req, res) {
//     console.log("Inside Recruiter update handler");
//     recruiterProfiles.findOneAndUpdate({ email: req.body.email }, { $set: { ...req.body } }, { upsert: true, new:true }, function (err, result) {
//         if (err) {
//             console.log("Error updating the Profile information.");
//             console.log(err)
//             res.sendStatus(400).end();
//         }
//         else if (result) {
//             console.log("Recruiter Profile updated: ", result);
//             res.sendStatus(200).end();
//         }
//     })
// });

module.exports = router;
