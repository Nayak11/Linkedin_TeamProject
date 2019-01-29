var router = require('express').Router();
var { logSavedJob } = require('../models/logSavedJob');
// Two ways of upserting the documents.
router.put('/logSavedJob', function (req, res) {
    console.log("Inside Logging data for admin dashboard");
    console.log(req.body);
if(req.body.search==true){  
   
	 
                logSavedJob.find({
                recruiter_email : req.body.recruiter_email,
            },(err, results) => {
                if(err){
                    console.log("Error retrieving ");
                    res.writeHead(400, {
                        'Content-type' : 'text/plain'
                    })
                    res.end("Error retrieving message details");
                } else {
                    console.log("Success");
                    res.writeHead(200, {
                        'Content-type' : 'application/json'
                    })
                    res.end(JSON.stringify(results));
                }
            })}
else{

    var log  = new logSavedJob({
        job_id:req.body.job_id,
        recruiter_email:req.body.recruiter_email,
        title:req.body.title,
        saved_job:req.body.saved_job,
      });


      logSavedJob.findOneAndUpdate({job_id:req.body.job_id},
        { $inc: { saved_job: req.body.saved_job} }).then((result)=>{
            console.log("Result  after 1 query" + result)
          if(result==null){
              console.log(result)
            log.save().then((log)=>{
                console.log("Details Saved : ",log);
                res.status(200).send("success")
            },(err)=>{
                console.log(err);
                res.status(400).send("failed")
            })
          }

        //   else{
            
        //             logDetails.findOneAndUpdate({job_id:req.body.job_id,city:req.body.city},
        //                 { $inc: { saved_job: req.body.saved_job} })
        //                 .then((result)=>{
        //                         console.log(result)
                           
        //                 },(err)=>{
        //                     console.log(err +" Error inserting details");
        //                     res.status(400).send("failed")
        //                 })
            
        //     if(flag==2)
        //      {}
        //   }
      })
    }

});


module.exports = router;