var mongoose = require('mongoose');

const logSavedJobschema= new mongoose.Schema({
    job_id : {
        type : Number
    },
    recruiter_email : {
        type : String
    },
    title :{
        type : String
    },
    saved_job : {
        type : Number
    }
    
})
var logSavedJob = mongoose.model('logSavedJob',logSavedJobschema);

module.exports = {logSavedJob};