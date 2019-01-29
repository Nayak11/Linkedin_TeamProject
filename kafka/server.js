var connection =  new require('./kafka/Connection');
//topics files
var getConnections= require('./services/getConnections.js')
var viewJobApplications= require('./services/viewJobApplications.js')
var viewUserProfiles= require('./services/viewUserProfiles.js')
var getAllMessages= require('./services/getAllMessages.js')

var { mongoose } = require('./db/mongoose');

// Log requests to console
var express = require('express');
var app = express();
var morgan = require('morgan');
app.use(morgan('dev'));

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running '+topic_name);
    //console.log(consumer)
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle');
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log("kafka backend producer send")
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
//handleTopicRequest("post_message",Books)
handleTopicRequest("getConnections",getConnections)
handleTopicRequest("viewJobApplications",viewJobApplications)
handleTopicRequest("viewUserProfiles",viewUserProfiles)
handleTopicRequest("getAllMessages",getAllMessages)



