var router = require('express').Router();
var { logDetails } = require('../models/loggingData');
// Two ways of upserting the documents.
router.put('/recruiter/logData', function (req, res) {
    console.log("Inside Logging data for admin dashboard");
    console.log(req.body);
    console.log(req.body.search)
    console.log(req.body.search==true)
    // "$job_id"

    if(req.body.searchall==true){
    logDetails.aggregate([
        {"$group" : {_id:{job_id:"$job_id",recruiter_email:req.body.recruiter_email}, count:{$sum:"$clicks"}}}
    ])  .then((results)=>{ 
        console.log(results)
        res.status(200).json({ success: true, results:results });
     }
    ,(err)=>{
        console.log("Error inserting details"+err);
        // res.status(400).send("failed")
    })
    }

else if(req.body.search==true){
    logDetails.find({job_id:"123"})
    .then((results)=>{ 
        console.log(results)
        res.status(200).json({ success: true, results:results });
     }
    ,(err)=>{

        console.log("Error inserting details"+err);
        res.status(400).send("failed")
    })
}

    // if(req.body.search==true){
    //     logDetails.aggregate([
    //         {"$group" : {_id:{job_id:100}}}
    //     ]).then((results)=>{ 
    //         console.log(results)
    //      }
    //     ,(err)=>{
    //         console.log("Error inserting details");
    //         res.status(400).send("failed")
    //     })

    //     // logDetails.find({job_id:req.body.job_id}).then((results)=>{ 
    //     //     res.writeHead(200, {
    //     //         'Content-type' : 'application/json'
    //     //     })
    //     //     res.end(JSON.stringify(results));
    //     //  }
    //     // ,(err)=>{
    //     //     console.log("Error inserting details");
    //     //     res.status(400).send("failed")
    //     // })
    // }

    else{
console.log("I am hre inide ")

    var log  = new logDetails({
        recruiter_email:req.body.recruiter_email,
        city:req.body.city,
        half_filled:req.body.half_filled,
        full_filled:req.body.full_filled,
        clicks:req.body.clicks,
        job_id:req.body.job_id
      });



      logDetails.find({job_id:req.body.job_id}).then((result)=>{
          console.log("1st result"+result)
          if(result.length==0){
              console.log(result)
            log.save().then((log)=>{
                console.log("Details Saved : ",log);
                res.status(200).send("success")
            },(err)=>{
                console.log("Error inserting details");
                res.status(400).send("failed")
            })
          }
          else{
              var i=0,flag=1
             
                    logDetails.findOneAndUpdate({job_id:req.body.job_id,city:req.body.city},
                        { $inc: { half_filled: req.body.half_filled,full_filled:req.body.full_filled,clicks:req.body.clicks } })
                        .then((result)=>{
                            if(result==null){
                                console.log(result)
                              log.save().then((log)=>{
                                  console.log("Details Saved : ",log);
                                  res.status(200).send("success")
                              },(err)=>{
                                  console.log("Error inserting details");
                                  res.status(400).send("failed")
                              })
                            }
                           
                        },(err)=>{
                            console.log("Error inserting details");
                            res.status(400).send("failed")
                        })
            
            if(flag==2)
             {}
          }
      })

    //   logDetails.findOneAndUpdate({job_id:90},{$push:{city:4}})
    //     .then((result)=>{
    //         if(result!=null) 
    //         console.log(result.city.exists(5))
    //         console.log("hello")
    //        console.log("Inseting booking date in property database") 
    //        console.log(result)
    //     },(err)=>{
    //         console.log("Error booking Up!");
    //         console.log(err)
    //     })  
    //   log.save().then((log)=>{
    //     console.log("Details Saved : ",log);
    //     res.status(200).send("success")
    // },(err)=>{
    //     console.log("Error inserting details");
    //     res.status(400).send("failed")
    // })
}    
});

module.exports = router;