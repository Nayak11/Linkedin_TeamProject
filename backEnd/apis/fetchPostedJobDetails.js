var router = require('express').Router();
var {jobApplications}  = require('../models/jobApplication');
const pool = require('../db/mysql');


router.get('/fetchPostedJobDetails', (req, res) => {
    console.log("Inside fetchPostedJobDetails GET request");
    let recEmail = req.query.email;
    let jobID = req.query.jobID;

    // let recEmail =    "aditi12395@gmail.com";
    // let jobID =   1

    console.log(typeof recEmail,recEmail);
    let sql = `select * from cmpe273db.job where recruiter_email="${recEmail}" and job_id=${jobID};`;
    pool.getConnection((err, con) => {
        if(err){
            con.release();
            console.log("Connection Error",err);
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
                    console.log("Jobs posted by you are...................",results);
                    if(results.length>0){
                        res.send({ 
                            status  : 200, 
                            message : 'Successfully found the record',
                            job     : results
                        });
                    }else{
                        res.send({ 
                            status  : 400, 
                            message : 'There are no records for this job ID' 
                        });
                    }
                }
            })
        }
    })
})


module.exports = router;
