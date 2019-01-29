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