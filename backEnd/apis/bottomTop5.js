var router = require('express').Router();
var {jobApplications}  = require('../models/jobApplication');
var mongoose = require("mongoose");
const pool = require('../db/mysql');

router.get('/bottomTop5', function (req, res) {
    console.log("inside top 5 job posting with less number of applications");

    let recEmail = req.query.email;
    //let recEmail = 'aditi12395@gmail.com';
    console.log(typeof recEmail,recEmail);
    let sql = `select job_id from cmpe273db.job where recruiter_email="${recEmail}"`;
    pool.getConnection((err, con) => {
        if(err){
            console.log("Connection Error");
            res.send({ 
                status  : 400, 
                message : 'Could Not Get Connection Object' 
            });
        } else{
            con.query(sql, (err, results) => {
                con.release();
                if(err){
                    console.log("Error executing SQL statement",err);
                    res.send({ 
                        status  : 400, 
                        message : 'Incorrect SQL statement' 
                    });
                } else{
                    //console.log("Jobs posted by you are...................",results);
                    let jobIDsToFind=[]
                    results.forEach(ele => {
                        jobIDsToFind.push(ele.job_id);
                    });
                    
                    console.log("Jobs posted by you are...................",jobIDsToFind);
                    jobApplications.aggregate([{
                             $match: { 
                                 jobID: { $in: jobIDsToFind } 
                            }
                        },
                        {
                            $group: {
                                _id     : "$jobID",
                                count   : { $sum  : 1 }
                            }
                        },
                        { 
                            $sort : { 
                                count : 1 
                            } 
                        },
                        {
                            $limit : 3 
                        }
                      ], function(err, jobsIDs) {
                            if(err){
                                console.log("Error occurred....")
                                res.send({
                                    status  : 400,
                                    message : "Failed fetching top 5 job posting with less number of applications"
                                })
                            }else{
                                console.log("Success....",jobsIDs)
                                res.send({ 
                                    status      : 200,
                                    message     : "Successfully fetched top 5 job posting with less number of applications",
                                    jobs        : jobsIDs
                                })
                            }
                        }
                    );
                }
            })
        }
    })
});

module.exports = router;
