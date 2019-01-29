var router = require('express').Router();
// const busboy = require('connect-busboy');
// const busboyBodyParser = require('busboy-body-parser');

// var express=require('express')
// var bodyParser=require('body-parser')
// const app = express();
// app.use(busboy());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(busboyBodyParser());

const Busboy = require('busboy');
const AWS = require('aws-sdk');
var AWS_CREDS = require('../config/config')
var path = require('path');
var fs = require('fs');

uploadToS3 = (file, email, fileType) => {

    console.log("Uploading file to S3 bucket....")
    let filePathInAws;
    let extension = path.extname(file.name);
    switch (fileType) {
        case "resume": filePathInAws = "Resumes/" + email + extension; break; //  Resumes/email@gmail.com.pdf
        case "profilePic": filePathInAws = "profilePics/" + email + extension; break;
        case "coverPic": filePathInAws = "coverPics/" + email + extension; break;
        case "logo": filePathInAws = "logos/" + email + extension; break;
    }
    console.log(filePathInAws);
    //it accesses s3 bucket
    let s3bucket = new AWS.S3({
        accessKeyId: AWS_CREDS.IAM_USER_KEY,
        secretAccessKey: AWS_CREDS.IAM_USER_SECRET,
        Bucket: AWS_CREDS.BUCKET_NAME,
    });
    s3bucket.createBucket(async function () {
        var params = {
            Bucket: AWS_CREDS.BUCKET_NAME,
            Key: filePathInAws,
            Body: file.data,
        };
        //Inbuilt access moethod to upload a file to s3
        await s3bucket.upload(params, function (err, data) {
            if (err) {
                console.log('UPLOADING TO S3 ERROR');
                console.log(err);
                res.sendStatus(400).end('Upload unsuccessful to S3 bucket');
            } else {
                console.log("File pushed is...", data);
                console.log('File uploaded successfully!');
            }

        });
    });
}

downloadFromS3 = (email, fileType, res) => {
    console.log("downloading file from S3 bucket...")
    console.log("Only jpg images are handled for now...")

    let filePathInAws;
    switch (fileType) {
        case "resume": filePathInAws = "Resumes/" + email + '.pdf'; break; //  Resumes/email@gmail.com.pdf
        case "profilePic": filePathInAws = "profilePics/" + email + '.jpg'; break;
        case "coverPic": filePathInAws = "coverPics/" + email + '.jpg'; break;
        case "logo": filePathInAws = "logos/" + email + '.jpg'; break;
    }
    console.log(filePathInAws);

    let s3bucket = new AWS.S3({
        accessKeyId: AWS_CREDS.IAM_USER_KEY,
        secretAccessKey: AWS_CREDS.IAM_USER_SECRET,
        Bucket: AWS_CREDS.BUCKET_NAME,
    });
    s3bucket.createBucket(async function () {
        var params = {
            Bucket: AWS_CREDS.BUCKET_NAME,
            Key: filePathInAws,
        };

        await s3bucket.getObject(params, function (err, data) {
            if (err) {
                console.log('NO DATA FOR FOUND FOR THIS USER');
                //console.log(err);
                res.sendStatus(400).end('Download unsuccessful from S3 bucket');
            } else {
                console.log('data retrieval from AWS success...');
                console.log(data);
                //res.setHeader('Content-disposition', 'attachment; filename=abcd1@gmail.com.jpg')
                //res.setHeader('Content-length', data.ContentLength);    
                res.end(new Buffer(data.Body.toString('base64')));
            }
        })
    });
}

module.exports = router;
module.exports.uploadToS3 = uploadToS3;
module.exports.downloadFromS3 = downloadFromS3;
