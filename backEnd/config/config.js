//const CORS_ORIGIN = 'http://ec2-13-58-95-68.us-east-2.compute.amazonaws.com:3000';
const PORT = '3002';
const IP_MONGODB_DATABASE = 'mongodb://user:cmpe273@ds257579.mlab.com:57579/linkedin';
//const IP_MONGODB_DATABASE = 'mongodb://admin:admin@52.53.77.103:27017,52.52.124.103:27017,13.52.65.236:27017/admin?replicaSet=linkedin';

//change db name accordingly
//const IP_MONGODB_DATABASE = 'mongodb://admin:admin@52.53.77.103:27017/admin';


/*
// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://52.53.77.103:27017/admin", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});*/

const IP_MYSQL_DATABASE='cmpe273db.cqumuz1tfjsq.us-east-1.rds.amazonaws.com'

const IP_KAFKA = 'localhost:2181';
const CORS_ORIGIN = 'http://linkiedinfrontend-274699885.us-west-1.elb.amazonaws.com:3000';

//AWS credentials:Vinay
const BUCKET_NAME = 'cmpe273';
const IAM_USER_KEY = 'AKIAJ7VFZCRVNQACNQUQ';
const IAM_USER_SECRET = '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';

exports.CORS_ORIGIN = CORS_ORIGIN;
exports.PORT = PORT;
exports.IP_MONGODB_DATABASE = IP_MONGODB_DATABASE;
exports.IP_KAFKA = IP_KAFKA;
exports.IP_MYSQL_DATABASE = IP_MYSQL_DATABASE;
exports.BUCKET_NAME=BUCKET_NAME;
exports.IAM_USER_KEY=IAM_USER_KEY;
exports.IAM_USER_SECRET=IAM_USER_SECRET;







