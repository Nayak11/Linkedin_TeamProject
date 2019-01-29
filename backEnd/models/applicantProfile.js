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
    personalProfile: {
        firstName: String,
        lastName: String,
        headLine: String,
        city: String,
        country: String,
        zipcode: String,
        contactInfo: String,
        summary: String,
        views: Number
    },
    experience: {
        designation: String,
        company: String,
        empStart: String,
        empEnd: String,
        empCity: String,
        empCountry: String
    },
    education: {
        college: String,
        major: String,
        eduStart: String,
        eduEnd: String
    },
    resume: {
        type: String
    },
    resumeCheck: {
        type: String
    },
    savedJobs: [{
        type: String
    }],
    skills: String
})
var applicantProfiles = mongoose.model('applicantProfile', applicantProfileschema);

module.exports = { applicantProfiles };