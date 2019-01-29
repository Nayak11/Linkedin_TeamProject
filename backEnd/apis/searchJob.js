var router = require('express').Router();
var pool = require("../db/mysql");
var mysql = require('mysql');

router.post('/searchjob', function (req, res) {
    console.log("Inside job search");
    console.log(req.body)
    console.log(req.body.experience_level)
    console.log(req.body.type_of_apply)
    var searchjob="%"+req.body.searchjob+"%"
    var searchlocation="%"+req.body.searchlocation+"%"
    console.log(searchjob)

    if (req.body.searchonly===true) {
        var sql = "SELECT * from `job` WHERE title like "
        + mysql.escape(searchjob) + "OR company like"+mysql.escape(searchjob)+"AND " + "location like "
        + mysql.escape(searchlocation)+"and recruiter_email!="+mysql.escape(req.body.email)+";"
    }
       
    else if(req.body.search===true){
    var a=req.body.experience_level
    var type_of_apply=req.body.type_of_apply
    var company="%"+req.body.company+"%"
    var timelapse=req.body.timelapse
        if(req.body.type_of_apply==='any'){
            type_of_apply="easyapply,apply"
            type_of_apply=type_of_apply.split(",")  
        }
            if(a===null || a===""){
                experience_level="internship,director,entrylevel,midseniorlevel,associate,executive"
                experience_level=experience_level.split(",")
            }
            else{
                experience_level=req.body.experience_level.split(",")
                console.log(req.body.experience_level.split(","))
            }     
            
            // "OR company like"+mysql.escape(company) + 
        var sql = "SELECT * from `job` WHERE title like "
            + mysql.escape(searchjob) +"and company like"+ mysql.escape(company)+  "AND location like "+ mysql.escape(searchlocation) + "AND experience_level IN ("+mysql.escape(experience_level)+") AND type_of_apply IN("+ mysql.escape(type_of_apply) +") and DATEDIFF(CURRENT_TIMESTAMP,posted_date_time)>=0 && DATEDIFF(CURRENT_TIMESTAMP,posted_date_time)<"+mysql.escape(timelapse)+";"
    }
    else {
        var sql = "SELECT * from `job` limit 5;"
    }

    console.log(sql);

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
                    console.log("******** Error in fetching jobs ******");
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
                    res.status(200).json({ success: true, result:result });
                }
            });
        }
    })
});

module.exports = router;
