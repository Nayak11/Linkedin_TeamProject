// // Create a Redis client
// const redis = require('redis');
// let client = redis.createClient(6379,'127.0.0.1');

// client.on('error', function (err) {
//     console.log('Redis not connected!!', err)
// });

// client.on('connect', function () {
//     console.log("Connected to Redis!")
// })

// // create redis middleware
// let redisMiddleware = (req, res, next) => {
//     let key = "__expIress__" + req.originalUrl || req.url;
//     client.get(key, function (err, reply) {
//         if (reply) {
//             res.send(reply);
//         } else {
//             res.sendResponse = res.send;
//             res.send = (body) => {
//                 client.set(key, JSON.stringify(body));
//                 res.sendResponse(body);
//             }
//             next();
//         }
//     });
// };

// module.exports = { client }