var router = require('express').Router();
var { applicantProfiles } = require('../models/applicantProfile');

router.put('/savejob', function (req, res) {
    console.log("Inside saveJob : ");
    //$addToSet --> to push unique values to array
    //$push --> to push all values.
    applicantProfiles.updateOne({ email: req.body.email }, { $addToSet: { savedJobs: req.body.saveJob } }, { upsert: true }, function (err, result) {
        if (err) {
            console.log("Error saving job data.");
            console.log(err)
            res.sendStatus(400).end();
        }
        else if (result) {
            console.log("job saved ! ", result);
            res.sendStatus(200).end();
        }
    })
})

module.exports = router;