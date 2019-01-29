const router = require('express').Router();
var { jobApplications } = require('../models/jobApplication');
var _ = require('lodash-node');
var pool = require('../db/mysql');

router.get('/applicant/applications', (req,res) => {
    console.log("Inside getAllApplications GET request");
    let applicantEmail = req.query.applicantEmail;
    jobApplications.find({
        email : applicantEmail
    },{jobID : 1, _id : 0}, (error, results) => {
        if (error) {
            console.log("Error finding mongo results for Job Applications");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error finding mongo results for Job Applications");
        } else {
            var jobIDArray = _.chain(results).pluck('jobID').flatten().uniq().value();
            let sql = "SELECT * FROM job where job_id IN(" + _.compact(jobIDArray) + ")";
            pool.getConnection(function (err, con) {
                if (err) {
                    console.log("SQL connection error");
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    //res.send("Could Not Get Connection Object");
                } else {
                    console.log("connection to db successfull");
                    con.query(sql, function (err, result) {
                        if (err) {
                            console.log("******** Error in fetching jobs applications******");
                            console.log(err);
                            res.writeHead(400, {
                                'Content-Type': 'text/plain'
                            })
                            //res.send("Invalid Credentials");
                        } else {
                            console.log(result);
                            //send result
                            // res.writeHead(200, {
                            //     'Content-Type': 'application/json'
                            // })
                            // res.end(JSON.stringify(result)); //error here 
                            res.status(200).json(result);
                        }
                    });
                }
            })
        }
    })
    
})

module.exports = router;