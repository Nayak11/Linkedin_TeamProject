var { applicantProfiles } = require('./../models/applicantProfile');
// Create a Redis client
const redis = require('redis');
let client = redis.createClient(6379,'127.0.0.1');

client.on('error', function (err) {
    console.log('Redis not connected!!', err)
});

client.on('connect', function () {
    console.log("Connected to Redis!")
})

const getProfile = "";


function handle_request(msg, callback) {

    console.log("Inside kafka backend viewUserProfiles module");
    //console.log(msg);


    client.get(getProfile, function (err, value) {
        if (err) {
            callback(err, null)
        }
        if (value) {
            console.log("Type of value :", typeof (value));
            result = JSON.parse(value);
            client.expire(getProfile, 5);
            callback(null, result)
        }
        else {
            applicantProfiles.find({
                email: msg.email,
            }, (err, results) => {
                if (err) {
                    callback(err, null)
                } else {
                    client.setex(getProfile,10, JSON.stringify(results), function (err) {
                        if (err) {
                            return console.error(err);
                        }
                    })
                    callback(null, results)
                }
            })
            console.log("after callback");
        }
    });
};

exports.handle_request = handle_request;



