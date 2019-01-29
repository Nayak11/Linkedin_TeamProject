'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoClient = require('mongodb').MongoClient;
//var mdb = require('../db/mongoose');
//var { Users } = require('../models/user');
var config = require('./settings');
console.log("In passport.js");
//the variables in config can be accessed from ENV_VAR.
var ENV_VAR = require('./config');


// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    var opts = {
        //jwtFromRequest: ExtractJwt.fromAuthHeader(),
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: config.secret
    };
    //console.log(opts.jwtFromRequest)
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {
        console.log(jwt_payload)
        console.log("Validating Traveler Login");
        mongoClient.connect(ENV_VAR.IP_MONGODB_DATABASE, (err, client) => {
            if (err) {
                console.log("error connecting to mongodb");
            } else {
                console.log("connection successful");
                const db = client.db('homeaway');
                db.collection('travelerLoginData').find({
                    email: jwt_payload.result.email,
                })
                    .toArray()
                    .then(function (err, result) {
                        if (err) {
                            return callback(err, false);
                        } else {
                            console.log("result arrived - user credentials", result)
                            delete result.password;
                            callback(null, result);
                        }
                    })
            }
        })
    }))
}

