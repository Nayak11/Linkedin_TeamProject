var bcrypt = require('bcryptjs');
var router = require('express').Router();
var config = require('../config/settings');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var passport = require('passport');
var passportJWT = require("passport-jwt");
var express = require('express');
var app = express();
// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });
// Bring in defined Passport Strategy
require('../config/passport')(passport);
// Log requests to console
app.use(morgan('dev'));
app.use(passport.initialize());
var pool = require('../config/mysql');
var mysql= require('mysql')
var ENV_VAR = require('../config/config');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();;
jwtOptions.secretOrKey = 'tasmanianDevil';
var redisMiddleware=require('../Redis/connectRedis')



router.post('/login', function (req, res) {
    console.log("User Login");
    console.log(req.body)
    var sql = "select email,password from User where email= " + mysql.escape(req.body.email);
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
                res.writeHead(400, {
                    'Content-Type': 'text/plain'
                })
                res.send("Error");
            } else if(result.length>0) {
             con.release()
                console.log(result);
                console.log(result[0].password)
                if (bcrypt.compareSync(req.body.password, result[0].password)) {
                    console.log("Validatiing bcrypt... ");
                    var payload='what';
                    var token = jwt.sign(payload, jwtOptions.secretOrKey);
                    res.status(200).json({ success: true, token:token,userEmail: req.body.email });
                }else{
                    // res.writeHead(400, {
                    //     'Content-Type': 'text/plain'
                    // })
                    // console.log("Incorrect password");
                    res.send(400,"Incorrect password");  
                }
                console.log(result);
              
            }
            else{
                console.log("No email exists")
                res.send(400,"Email doesn't exist");  
            }
        });
    }
})

});

//     var sql = "select email,password from User where email= " + mysql.escape(req.body.email) +" );";
//         console.log(sql);
//         pool.getConnection(function (err, con) {
//             if (err) {
//                 console.log("connection error");
//                 res.writeHead(400, {
//                     'Content-Type': 'text/plain'
//                 })
//                 res.end("Could Not Get Connection Object");
//             } else {
//             console.log("connection successful");
//             con.query(sql, function (err, result) {
//                 if (err) {
//                     console.log(err);
//                     res.writeHead(400, {
//                         'Content-Type': 'text/plain'
//                     })
//                     res.end("Email already exists");
//                 } else {
//                     if (bcrypt.compareSync(req.body.password, result[0].password)) {
//                         console.log("Validatiing bcrypt... ");
//                         if (result.length > 0) {
//                             console.log("login successful");
//                             res.status(200).json({ success: true, cookie: req.body.email });
                         
//                         } else {
//                             res.writeHead(400, {
//                                 'Content-Type': 'text/plain'
//                             })
//                             console.log("No details found");
//                             res.end("No details found");
//                         }
//                     } else {
//                         res.writeHead(400, {
//                             'Content-Type': 'text/plain'
//                         })
//                         console.log("Invalid Username/Password");
//                         res.end("Invalid Username/Password");
//                     }
//                 }), (err) => {
//                     console.log("Unable to fetch Documents");
//                 }
//             client.close();
//         }
//     })
// });

module.exports = router;
