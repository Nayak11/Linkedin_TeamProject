const router = require('express').Router();
const pool = require('../db/mysql');

router.get('/recruiter/getPostedJobs/', (req, res) => {
    console.log("Inside getPostedJobs GET request");
    let recEmail = req.query.email;
    console.log(typeof recEmail,recEmail);
    let sql = `SELECT * from cmpe273db.job where recruiter_email="${recEmail}"`;
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
                    console.log("Sending this result...................".results);
                    res.send({ 
                        status  : 200, 
                        result  : results
                    });
                }
            })
        }
    })
})

module.exports = router;