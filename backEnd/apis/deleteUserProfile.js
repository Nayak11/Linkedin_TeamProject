var router = require('express').Router();
var { applicantProfiles } = require ('../models/applicantProfile');

router.post('/deleteUserProfile', (req, res) => {
    console.log("Inside delete user profile List request");
    let emailID = req.query.email;
    applicantProfiles.findByIdAndRemove({
        emailID,
    }, (err, results) => {
        if(err){
            console.log("Error finding mongo results for User Profile to be deleted");
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Error finding mongo results for User Profile to be deleted");
        } else {
            console.log("Successfully deleted User Profile");
            res.writeHead(200, {
                'Content-type' : 'profile/json',
            })
            res.end(JSON.stringify(results));
        }
    })
})
module.exports = router;