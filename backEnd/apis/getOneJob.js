const router = require('express').Router();
const pool = require('../db/mysql');

router.post('/getSavedJobs', (req, res) => {
    console.log("Inside getsavedJobs GET request",req.body);
    let savedJobs = req.body.savedJobs;
    console.log(savedJobs);
    console.log(savedJobs.join());
    let sql = `SELECT * FROM job WHERE job_id IN (` + savedJobs.join() + `)`;
    console.log("SQL QUERY",sql);
    pool.getConnection((err, con) => {
        if (err) {
            console.log("Connection Error");
            res.send({
                status: 400,
                message: 'Could Not Get Connection Object'
            });
        } else {
            con.query(sql, (err, results) => {
                con.release();
                if (err) {
                    console.log("Error executing SQL statement", err);
                    res.send({
                        status: 400,
                        message: 'Incorrect SQL statement'
                    });
                } else {
                    console.log("Sending this result...................".results);
                    res.send({
                        status: 200,
                        result: results
                    });
                }
            })
        }
    })
})

module.exports = router;