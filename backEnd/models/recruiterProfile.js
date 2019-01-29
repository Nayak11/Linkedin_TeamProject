var mongoose = require('mongoose');

const recruiterProfileschema= new mongoose.Schema({
    email :{
        type : String,
        // required:true,
        // unique:true
        
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
    city : {
        type : String
    },
    state : {
        type : String
    },
    zcode : {
        type : String
    },
    phone : {
        type : String
    },
    company : {
        type : String
    },
    
    
})
var recruiterProfiles = mongoose.model('recruiterProfile',recruiterProfileschema);

module.exports = {recruiterProfiles};