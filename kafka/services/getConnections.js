var { connections } = require('./../models/connections');

function handle_request(msg, callback){
   
    console.log("Inside kafka backend");
    console.log(msg);
    connections.find({
        from:msg.email,
    }, (err, results) => {
        if(err){
            callback(err, null)
        } else {
            callback(null, results)
        }
    })    
    console.log("after callback");
};

exports.handle_request = handle_request;



    