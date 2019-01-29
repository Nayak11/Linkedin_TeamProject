var mongoose = require('mongoose');

const logDataschema= new mongoose.Schema({
    job_id : {
        type : Number
    },
    recruiter_email : {
        type : String
    },
    city :{
        type : String
    },
    half_filled : {
        type : Number
    },
    clicks : {
        type : Number
    },
    full_filled : {
        type : Number
    }
    
})
var logDetails = mongoose.model('logData',logDataschema);

module.exports = {logDetails};