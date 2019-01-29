const router = require('express').Router();
const pool = require('../db/mysql');

router.put('/recruiter/editPostedJob/', (req, res) => {
    console.log("Inside editPostedJob GET request");
    const jobId = req.body.jobId;
    let job = req.body;
    console.log(job);
    let sql = `UPDATE job SET title = '${job.title}', description = '${job.description}', industry = '${job.industry}', employment_type = '${job.employmentType}', location = '${job.location}', job_function = '${job.jobFunction}' WHERE job_id = ${job.jobId}`;
                console.log(sql);
    pool.getConnection((err, con) => {
        if(err){
            console.log("Connection Error");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else{
            con.query(sql, (err, results) => {
                if(err){
                    console.log("Error executing SQL statement");
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Incorrect SQL statement");
                } else{
                    console.log("Job edited successfully");
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Job modified successfully");
                }
            })
        }
    })
})

module.exports = router;