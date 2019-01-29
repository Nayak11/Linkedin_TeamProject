var router = require('express').Router();
var { jobApplications } = require('../models/jobApplication');

//Route to handle Post Request Call
router.get('/viewParticularAppDetails',function(req,res){

    console.log("Inside view particular application details request");
    console.log("Job Application id received",req.query)
   
    jobApplications.find({_id : req.query._id}, function (err, result) {
        if(err){
            res.send({
                status  : 400,
                message : err
            })
        }else{
            console.log("Detail view of job application",result);
            res.send({
                status   : 200,
                property : result,
                message  : "Successfully fetched the details for owner dashboard"
            })
        }
    })
    
});


module.exports = router;
