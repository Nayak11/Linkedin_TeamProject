var router = require('express').Router();
var { jobApplications } = require('../models/jobApplication');

router.post('/singleJobApplication', (req, res) => {
    console.log("Inside job Application List request");
    let jobID = req.body.jobId;
    let email=req.body.email;
    console.log("inside job id for particular job id"+jobID);
    jobApplications.find({
        jobID,email
    }, (err, results) => {
        if(err){
            console.log("Error finding mongo results for Job Applications");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error finding mongo results for Job Applications");
        } else {
            console.log("result"+results)
            console.log("result is:" +results.length)
            if(results.length>=1)
            {
                console.log("Successfully retrieved a singlr job Applications");
            // res.writeHead(200, {
            //     'Content-Type': 'text/plain'
            // })
            res.end("200");
              }
              else{
                console.log("inside no existing job particular")
                res.end("210")
              }
        }
    })
})

module.exports = router;