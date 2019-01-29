var router = require('express').Router();
var pool = require("../db/mysql");

//Route to handle Post Request Call
router.get('/searchPostedJob',function(req,res){

    console.log("Inside Search Posted Job Request");
    console.log("Data received about the Job",req.query)
    req.query.job_id
    let sql=`select * from job where job_id='${req.query.job_id}' or title='${req.query.title}' 
    or location='${req.query.location}' or industry='${req.query.industry}' or employment_type='${req.query.employment_type}'`;
    
    pool.getConnection(function(err,con){
        if(err){
            //con.release();
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,(err, result)=>{
                con.release();
                if(err){
                    throw err;
                }else{
                    if(result.length===0){
                        res.send({
                            status  : 204,
                            message : "No jobs found for your search criteria."
                        })
                    }
                    console.log("Result of fetching job details based on search criteria",result)
                    res.send({
                        status  : 200,
                        res     : result
                    })
                }
            });
        }
    });
    
});


module.exports = router;
