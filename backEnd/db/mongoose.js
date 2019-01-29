var mongoose = require('mongoose');
var configLink=require('../config/config');
mongoose.Promise = global.Promise;

mongoose.connect(configLink.IP_MONGODB_DATABASE,{ poolSize:500, useNewUrlParser: true,useCreateIndex: true });
var mdb=mongoose.connection;
mdb.on('error',console.error.bind(console,'Connection error'))
mdb.on('open',()=>{
    console.log('MongoDB connected!')
})

module.exports = {mongoose};