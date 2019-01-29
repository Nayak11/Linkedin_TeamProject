var { jobApplications } = require('./../models/jobApplication');

function handle_request(msg, callback){
   
    console.log("Inside kafka backend jobApplication module");
    console.log(msg);
    jobApplications.find({
        jobID:msg.jobId,
    }, (err, results) => {
        if(err){
            callback(err, null)
        } else {
            callback(null, results)
        }
    })    
    console.log("after callback");
};

exports.handle_request = handle_request;



    