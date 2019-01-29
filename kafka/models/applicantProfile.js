var mongoose = require('mongoose');

const applicantProfileschema = new mongoose.Schema({
    email: {
        type: String,
        //required:true,
        //unique:true

    },
    profilepicture: {
        type: String
    },
    cover: {
        type: String
    },
    fName: {
        type: String
    },
    lName: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zcode: {
        type: String
    },
    experience: {
        type: String
    },
    education: {
        type: String
    },
    skill: {
        type: String
    },
    summary: {
        type: String
    },
    resume: {
        type: String
    },
    savedJobs: {
        type: Array
    }

})
var applicantProfiles = mongoose.model('applicantProfile', applicantProfileschema);

module.exports = { applicantProfiles };