var mongoose=require('mongoose');
var Schema = mongoose.Schema;

//Booking schema
var messgaesSchema = Schema({
    participants : [String],
    messages : [{
        from    : String,
        msg     : String,
        status  : String
    }]
});


module.exports= mongoose.model('Message', messgaesSchema,'Messages');