var mongoose = require('mongoose');

const jobApplicationschema= new mongoose.Schema({
    jobID : {
        type : Number
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
    firstName : {
        type : String
    },
    lastName : {
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
    },
    city:{
        type: String
    },
    month:{
        type: String
    }
    
})
var jobApplications = mongoose.model('jobApplication',jobApplicationschema);

module.exports = {jobApplications};