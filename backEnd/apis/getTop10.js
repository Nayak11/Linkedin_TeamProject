var router = require('express').Router();
var {jobApplications}  = require('../models/jobApplication');
const pool = require('../db/mysql');
var mongoose = require("mongoose");


router.get('/getTop10', (req, res) => {
    console.log("Inside getTop10 GET request");
    let recEmail = req.query.email;
   //let recEmail = 'aditi12395@gmail.com';
    console.log(typeof recEmail,recEmail);
    let sql = `select * from cmpe273db.job where recruiter_email="${recEmail}" order by  posted_date_time asc limit 10;`;
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
                    results.forEach((ele)=>{
                        jobIDsToFind.push(ele.job_id);
                    })

                    console.log("Job ID's to find....",jobIDsToFind)

                    if(jobIDsToFind.length>0){
                        jobApplications.find({
                            jobID : {$in : [...jobIDsToFind]}
                        }, function(err, resp) 
                            {
                            if (err)
                            {
                                console.log("Errror occurred while listing top 10", err);
                                res.send({ 
                                    status      : 400,
                                    message     : "Errror occurred while listing top 10",
                                    error       : err
                                })
                            }else{
                                console.log("Listing top 10", resp.length);
                                res.send({ 
                                    status      : 200,
                                    message     : "Successfully fetched top 10 job posting with it's application/month",
                                    jobs        : resp
                                })
                            }
                            }
                        )
                    }
                    else{
                        res.send({ 
                            status      : 400,
                            message     : "Hey recruiter, first post the job then do these nakra"
                        })
                    }
                
                    /*jobApplications.aggregate([
                        {
                            $group: {
                                _id     : {
                                  jobID    :   "$jobID"
                                },
                                count   : { $sum  : 1 }
                            }
                        },
                        { 
                            $sort : { 
                                count : -1 
                            } 
                        },
                        {
                            $limit : 10 
                        }
                      ], function(err, jobsIDs) {
                            if(err){
                                console.log("Error occurred....")
                                res.send({
                                    status  : 400,
                                    message : "Failed while fetching top 10 job posting with it's application/month"
                                })
                            }else{
                                console.log("Success....",jobsIDs)
                                const idList=[];
                                jobsIDs.forEach(element => {
                                    idList.push(parseInt(element._id.jobID,10));
                                });

                                console.log("Top 10 job ID's to find",idList)

                                jobApplications.find({
                                    jobID : {$in : [...idList]}
                                }, function(err, resp) 
                                    {
                                    if (err)
                                    {
                                        console.log("Errror occurred while listing top 10", err);
                                    }else{
                                        console.log("Listing top 10", resp.length);
                                        res.send({ 
                                            status      : 200,
                                            message     : "Successfully fetched top 10 job posting with it's application/month",
                                            jobs        : resp
                                        })
                                    }
                                    }
                                )
                            }
                      });*/
                }
            })
        }
    })
})


module.exports = router;
