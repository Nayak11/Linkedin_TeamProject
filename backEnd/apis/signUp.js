var router = require('express').Router();
var bcrypt = require('bcryptjs');
var pool = require('../config/mysql');
var mysql= require('mysql')

router.post('/signup', function (req, res) {
    console.log("Inside User Signup handler");
    console.log(req.body);
    
        var firstname1=req.body.firstName
        var lastname1=req.body.lastName
        var email1=req.body.email
        var password1=req.body.password

    var salt = bcrypt.genSaltSync(10);
    // Hash the password with the salt
    var hash = bcrypt.hashSync(password1, salt);
    console.log(hash);
    var sql = "INSERT INTO User(firstName,lastName,email,password) VALUES ( " +
        mysql.escape(firstname1) + " , " + mysql.escape(lastname1) + " , " +
        mysql.escape(email1) + " , " + mysql.escape(hash) +" );";

        console.log(sql);

    pool.getConnection(function (err, con) {
        if (err) {
            console.log("connection error");
             res.writeHead(400, {
                 'Content-Type': 'text/plain'
             })
             res.end("Could Not Get Connection Object");
        } else {
            con.query(sql, function (err, result) {
                con.release();
                if (err) {
                    console.log(err);
                     res.writeHead(400, {
                         'Content-Type': 'text/plain'
                     })
                     res.end("Email already exists");
                } else {
                    console.log(result);
                     res.writeHead(200, {
                         'Content-Type': 'text/plain'
                     })
                     res.end("Successful Signup");
                }
            });
        }
    })
});

module.exports = router;