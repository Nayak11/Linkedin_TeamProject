var router = require('express').Router();
var config = require('../config/settings');
var morgan = require('morgan');
var express = require('express');
var app = express();
// Set up middleware
// Bring in defined Passport Strategy
// Log requests to console
app.use(morgan('dev'));
var pool = require('../config/mysql');
var mysql= require('mysql')
var ENV_VAR = require('../config/config');


router.post('/isUserValid', function (req, res) {
    console.log("doiing search user validation");
    console.log(req.body)
    var sql = "select * from User where email =" + mysql.escape(req.body.email);
        console.log(sql);

   pool.getConnection(function (err, con) {
    if (err) {
        console.log("connection error");
        res.writeHead(400, {
            'Content-Type': 'text/plain'
        })
        res.end("Could Not Get Connection Object");
    } else {
        con.query(sql, async function (err, result) {
            //con.release();
            if (err) {
                console.log(err);
                // res.writeHead(400, {
                //     'Content-Type': 'text/plain'
                // })
                //res.send("Error");
            } else if(result.length>0) {
             con.release()
                console.log(result);
                res.status(200).json({userEmail: req.body.email });
            }
            else{
                console.log("No email exists")
                res.send(400,"Email doesn't exist");  
            }
        });
    }
})

});
module.exports = router;
