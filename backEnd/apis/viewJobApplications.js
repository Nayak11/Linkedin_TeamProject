// var router = require('express').Router();
// var kafka = require('../kafka/client');

// router.get('/jobApplication', (req, res) => {
//     console.log("Inside job Application List GET request");
//     //let jobID = req.query.jobId;
//     kafka.make_request('viewJobApplications', req.query, (err, results) => {
//         console.log("In node kf --> Post Message Handler")
//         if (err) {
//             console.log("Error occured")
//             res.json({ status: "error", msg: "System error" })
//             res.sendStatus(400).end();
//         }
//         else {
//             console.log("Got results in node kf")
//             res.writeHead(200, {
//                 'Content-Type': 'application/json'
//             })
//             res.end(JSON.stringify(results));
//         }
//     })  
// })

// module.exports = router;

var router = require('express').Router();
var { jobApplications } = require('../models/jobApplication');

router.get('/jobApplication', (req, res) => {
    console.log("Inside job Application List GET request");
    let jobID = req.query.jobId;
    console.log(jobID);
    jobApplications.find({
        jobID,
    }, (err, results) => {
        if(err){
            console.log("Error finding mongo results for Job Applications");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error finding mongo results for Job Applications");
        } else {
            console.log("Successfully retrieved job Applications");
            res.writeHead(200, {
                'Content-type' : 'application/json',
            })
            res.end(JSON.stringify(results));
        }
    })
})

module.exports = router;