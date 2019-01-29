const router = require('express').Router();
const pool = require('../db/mysql');
var bcrypt = require('bcryptjs');

router.get('/authRecruiter/', (req, res) => {
    console.log("Inside authRecruiter before posting the job",req.query.email,req.query.password);
    let recEmail = req.query.email;
    let recPwd = req.query.password;
    let sql = `SELECT * from cmpe273db.User where email="${recEmail}"`;
    pool.getConnection((err, con) => {
        if(err){
            console.log("Connection Error");
            res.send({ 
                status  : 400, 
                message : 'Could Not Get Connection Object' 
            });
        } else{
            console.log("In else............")
            con.query(sql, (err, results) => {
                con.release();
                if(err){
                    console.log("Error executing SQL statement",err);
                    res.send({ 
                        status  : 400, 
                        message : 'Incorrect SQL statement' 
                    });
                } else if(results.length>0){
                    console.log("Sending this result...................",results[0].password);
                    
                    bcrypt.compare(recPwd,results[0].password,(err,result)=>{
                        if(err){
                            res.send({ 
                                status  : 400, 
                                message : 'Bcrypt failed!!!' 
                            });
                        }
                        console.log("Does the traveller password match ?",result)
                        if(result==true){
                            res.send({ 
                                status  : 200, 
                                message : 'Congratulations, successfully authenticated!!!' 
                            });
                        }else{
                            res.send({ 
                                status  : 401, 
                                message : 'Authentication failed, try again!!!' 
                            });
                        }
                    })
                }else{
                    res.send({ 
                        status  : 401, 
                        message : 'Authentication failed, try again!!!' 
                    });
                }
            })
        }
    })
})

module.exports = router;