const router = require('express').Router();
const pool = require('../db/mysql');

router.get('/recruiter/viewPostedJob/', (req, res) => {
    console.log("Inside viewPostedJob GET request");
    let jobId = req.query.jobId;
    let sql = "SELECT * from job where job_id = "+jobId;
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
                    console.log(results);
                    res.writeHead(200, {
                        'Content-type': 'application/json',
                    })
                    res.end(JSON.stringify(results));
                }
            })
        }
    })
})

module.exports = router;