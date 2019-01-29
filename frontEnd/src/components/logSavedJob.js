import React, { Component } from 'react';
import {Chart,Pie,Line,Bar} from 'react-chartjs-2'
import axios from "axios";
import {Link} from 'react-router-dom';
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'
class LogSaveJob extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Data:"",
         }
    }
    

    componentDidMount() {
        console.log("I am here")
        const data={
            recruiter_email:localStorage.getItem('userEmail'),
            search:true
        }
        axios.put(IP_backEnd+'/logSavedJob',data)
          .then(res => {
              console.log(res)
            const info = res.data;
            console.log(res.data)
            let title = [];
            let savedjob = [];
            info.forEach(element => {
              title.push(element.title);
              savedjob.push(element.saved_job);
            });
            console.log("title"+title)
            console.log(savedjob)
            this.setState({ 
              Data: {
                labels: title,
                datasets:[
                   {
                      label:'Saved Job',
                      data: savedjob ,
                      backgroundColor: 'rgba(255,105,145,0.6)',
                   }
                ]
             }
             });
          })
      }

    render() { 
        return ( <div className="h-75">

                <Bar
            	data={this.state.Data}
                options={{
                maintainAspectRatio: false
              }}
          />

        </div> );
    }
}
 
export default LogSaveJob;