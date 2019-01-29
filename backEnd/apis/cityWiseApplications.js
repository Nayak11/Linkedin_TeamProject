const router = require('express').Router();
var {jobApplications} = require('../models/jobApplication');
var _ = require('lodash-node');

router.get('/dashboard/city', (req,res) => {
    var jobID = req.query.jobID;
    jobApplications.aggregate([{
        $match : {jobID}
    },
       { "$group" : {
            _id : {
                "month" : "$month",
                "city" : "$city"
            },
            "applications" : {$push : "$city"}
        }
    }, {
        $project : {
            "applicationCount" : {$size : "$applications"}
        }
    }
    ]).then(results => {
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(JSON.stringify(results));
    }, (error)=>{
        console.log(error);
        res.writeHead(400, {
            'Content-type': 'text/plain'
        })
        res.end("Error retrieving city wise applications");
    })
})


module.exports = router;