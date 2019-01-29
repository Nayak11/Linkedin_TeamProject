var mongoose = require('mongoose');

const jobApplicationschema= new mongoose.Schema({
    jobID : {
        type : String
    },
    resume : {
        type : String
    },
    email :{
        type : String,
        // required:true,
        // unique:true
        
    },
    cover : {
        type : String
    },
    fName : {
        type : String
    },
    lName : {
        type : String
    },
    address : {
        type : String
    },
    hear : {
        type : String
    },
    sponsorship : {
        type : String
    },
    disability : {
        type : String
    }
    
})
var jobApplications = mongoose.model('jobApplication',jobApplicationschema);

module.exports = {jobApplications};