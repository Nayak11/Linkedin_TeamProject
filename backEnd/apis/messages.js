var router = require('express').Router();
var messagesModule  = require('../models/messages');

router.post('/messages', function (req, res) {
    console.log("POST messages route");
    console.log("Received files: ",req.body);

    let parties=[req.body.participants[0],req.body.participants[1]]
    let msgs=[
        {
            from    : req.body.messages.from,
            msg     : req.body.messages.msg,
            status  : "NR"
        }   
    ]

    const message = new messagesModule({
        participants    : parties, 
        messages        : msgs
    });

    messagesModule.find({participants : {$all : parties}}, function (err, result) {
        if(err){
            res.send({
                status  : 400,
                message : "Failed while fetching booked properties details.",
                Error   : err
            })
        }else{
            console.log("Result of finding the participant:",result);
            if(result.length>0){
                messagesModule.update({participants : {$all : parties}}, 
                    { $push: { messages: msgs } }
                    ,function(err, resul) {
                    console.log(resul);
                    if (err) {
                      res.send({
                        status      : 400,
                        message     : "Something went wrong while sending the message to existing user"
                      })
                    }else{
                        res.send({ 
                            status      : 200,
                            message     : "Successfully sen the message to existing user"
                        })
                    }
                  });
            }else{
                message.save().then(function(error,success){
                    console.log("Result of creating a new property row",error,success)
                    res.send({ 
                        status      : 200,
                        message     : "Successfully sent the message to new user"
                    })
                }).catch((err)=>{
                    console.log("While creating new property....",err)
                    res.send({
                        status      : 400,
                        message     : "Something went wrong while sending the message to new user"
                    })
                }); 
            }
        }
    });

    
});

module.exports = router;
