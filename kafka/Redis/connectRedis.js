// Create a Redis client
const redis = require('redis');
let client = redis.createClient(6379,'127.0.0.1');

client.on('error', function (err) {
    console.log('Redis not connected!!', err)
});

client.on('connect', function () {
    console.log("Connected to Redis!")
})



module.exports = { client }
