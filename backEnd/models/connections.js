var mongoose = require('mongoose');

const connectionSchema= new mongoose.Schema({
    from:{
        type:String
    },
    to:{
        type:String
    },
    status:{
        type:Number
    }
    
})
var connections = mongoose.model('connections',connectionSchema);

module.exports = {connections};

//status:1--> connected
//status:0--> In progress
//status:2--> Not accepted