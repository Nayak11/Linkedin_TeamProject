var ENV_VAR = require('./config/config');
var pool = require('./config/mysql');
var mysql=require('mysql')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var morgan = require('morgan');


//Route imports
var signUp = require('./apis/signUp');
var userLogin = require('./apis/userLogin');
var jobApplication = require('./apis/jobApplication');
var updateProfiles = require('./apis/updateProfiles');
var postJob = require('./apis/postJob');
var searchPostedJob = require('./apis/searchPostedJob')
var viewParticularAppDetails = require('./apis/viewParticularAppDetails')
var viewPostedJob = require('./apis/viewPostedJob');
var editPostedJob = require('./apis/editPostedJob');
var viewJobApplications = require('./apis/viewJobApplications');
var searchJob = require('./apis/searchJob');
var logData =require('./apis/logData')
var logSavedJob=require('./apis/logSavedJob')
var particularjobapplication=require('./apis/viewParticularJobApplication')
var isUserValid = require('./apis/isUserValid');

var getOneJob = require('./apis/getOneJob');
var cityWiseApplications = require('./apis/cityWiseApplications');

//Only for AWS
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
app.use(busboy());

//TO INCREASE PAYLOAD LIMIT TO 50MB : NOT RECOMMENDED
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
    parameterLimit: 100000
  }))

  app.use(bodyParser.json({
    limit: '50mb',
    parameterLimit: 100000
  }))

   app.use(bodyParser.raw({
    limit: '50mb',
    inflate: true,
    parameterLimit: 100000
  }))
app.use(busboyBodyParser());


//Mongo connection
var { mongoose } = require('./db/mongoose');

// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

app.use(express.static('uploads'));

//Redis connection
// const redis = require('redis');
// require('./Redis/connectRedis')

// Log requests to console
app.use(morgan('dev'));

app.use(cors({ origin: ENV_VAR.CORS_ORIGIN, credentials: true }));
app.use(session({
    secret: 'cmpe273_kafka_passport_mongo',
    resave: true, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', ENV_VAR.CORS_ORIGIN);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// create travelerLogin in apis and write code there.
//app.use('/', travelerLogin);
app.use('/',signUp);
app.use('/',userLogin)
app.use('/',searchJob)
app.use('/',logData)
app.use('/',logSavedJob)
app.use('/',userLogin);
app.use('/',particularjobapplication)

//Route imports
var viewUserProfile = require('./apis/viewUserProfile');
var deleteUserProfile = require('./apis/deleteUserProfile');
var jobApplication = require('./apis/jobApplication');
var updateProfiles = require('./apis/updateProfiles');
var getAllApplications = require('./apis/getAllApplications');

var searchJob = require('./apis/searchJob');
var postJob = require('./apis/postJob');
var searchPostedJob = require('./apis/searchPostedJob')
var viewParticularAppDetails = require('./apis/viewParticularAppDetails')
var viewPostedJob = require('./apis/viewPostedJob');
var editPostedJob = require('./apis/editPostedJob');
var viewJobApplications = require('./apis/viewJobApplications');
var savejob = require('./apis/saveJob');
var getAllMessages = require('./apis/getAllMessages');
var getParticularMessages = require('./apis/getParticularMessages');
//Aws s3 upload/import method
var resumeupload = require('./AWS_s3/s3BucketOperations');
var makeConnection = require('./apis/makeConnection');
var Connections = require('./apis/Connections');
var messages = require('./apis/messages');
var getConnections = require('./apis/getConnections');
// var changeMessageStatus = require('./apis/changeMessageStatus')
var changeMessageStatus = require('./apis/changeMessageStatus')
var getAllPostedJobs = require('./apis/getAllPostedJobs')
var authRecruiter = require('./apis/authRecruiter')

var bottomTop5 = require('./apis/bottomTop5')
var getTop10 = require('./apis/getTop10');
var getViewCount = require('./apis/getProfileViewCount');

var particularjobapplication=require('./apis/viewParticularJobApplication')
var fetchPostedJobDetails=require('./apis/fetchPostedJobDetails')


//This route is used to view the user profile by email
app.use('/', viewUserProfile);
//This route is used to delete the user profile by email
app.use('/', deleteUserProfile);
app.use('/', jobApplication);
app.use('/', updateProfiles);
// applicant job search results.
app.use('/', searchJob);
app.use('/', viewPostedJob);
app.use('/', editPostedJob);
app.use('/', viewJobApplications);
//To view all the jobs the applicant has applied to
app.use('/', getAllApplications);
//save Job
app.use('/', savejob)
//This route is used to post a job
app.use('/', postJob)
//This route is used to filter posted job
app.use('/', searchPostedJob)
//This route is used to view particular application details
app.use('/', viewParticularAppDetails)
//This is used to get all the messages of a particular user
app.use('/', getAllMessages);
//This is used to get the conversation between two users
app.use('/', getParticularMessages);
//Aws s3
app.use('/', resumeupload)
//send connection request
app.use('/', makeConnection)
//accept connection request
app.use('/', Connections)
//this route is used to send the messages 
app.use('/',messages)
// //this route is used to update the status of the message
// app.use('/',changeMessageStatus)
//To Get the connections of the User.
app.use('/',getConnections)
//this route is used to update the status of the message
app.use('/',changeMessageStatus)
//this route is used to get all the jobs posted by a particular recruiter
app.use('/',getAllPostedJobs)
//this route is used to authenticate the recruiter before posting the job
app.use('/',authRecruiter)

app.use('/', getViewCount);

//this route will return top 5 job posting with less number of applications
app.use('/',bottomTop5)

//this route will return top 10 job posting with it's application/month
app.use('/',getTop10)

app.use('/', cityWiseApplications);


//get one job at a time, used in displaying saved jobs.
app.use('/',getOneJob);

//This route is used to check if the recruiter has already posted this job
app.use('/',fetchPostedJobDetails)

app.use('/',isUserValid);


app.listen(ENV_VAR.PORT);
console.log("Server running on port " + ENV_VAR.PORT);