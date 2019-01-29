var  Message  = require('./../models/messages');

function handle_request(msg, callback){
   
    console.log("Inside kafka backend getAllMessages module");
    console.log(msg);
    Message.find({
        participants : msg.participantID,
    },{ messages : {$slice : -1} },(err, results) => {
        if(err){
            callback(err, null)
        } else {
            //console.log(results)
            callback(null, results)
        }
    })    
    console.log("after callback");
};

exports.handle_request = handle_request;



    