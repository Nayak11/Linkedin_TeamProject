var router = require('express').Router();
var messagesModule  = require('../models/messages');
var mongoose = require("mongoose");

router.post('/changeMessageStatus', function (req, res) {
    console.log("Chanhe message status route");
    console.log("Received files: ",req.body);

    let parties=[req.body.participants[0],req.body.participants[1]]

    messagesModule.find({participants : {$all : parties}}, function (err, result) {
        if(err){
            callback(null, {
                status  : 400,
                message : "Failed fetching message details beteween these two users."
            })
        }else{
            console.log("Result of finding the participant:",result,"Message id",req.body.msg_id);
            if(result.length>0){
                messagesModule.update({participants : {$all : parties}}, 
                   {$set : { "messages.$[elem].status": "R"}},
                   {"arrayFilters" : [{"elem._id" : mongoose.Types.ObjectId(req.body.msg_id)}]},
                    function(err, resul) {
                    console.log("Result of finding particular message.......",resul);
                    if (err) {
                      console.log("Error is -",err)
                      res.send({
                        status      : 400,
                        message     : "Something went wrong while changing the message status as read"
                      })
                    }else{
                        res.send({ 
                            status      : 200,
                            message     : "Successfully changes the message status to read"
                        })
                    }
                  });
            }else{
                    res.send({
                        status      : 204,
                        message     : "No messages found for these users"
                    })
            }
        }
    });

    
});

module.exports = router;
