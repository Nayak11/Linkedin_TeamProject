import React, { Component } from 'react';
import LogSaveJob from './logSavedJob';
import {Chart,Pie,Line,Bar} from 'react-chartjs-2'
import axios from "axios";
import {Link} from 'react-router-dom';
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'
import Navbar from './RecHomeNavbar'

class Dashboard1 extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          Dataall:""
        }
      } 
            
          
       
    componentDidMount() {
      console.log("I am here")
      const dataall={
        recruiter_email:localStorage.getItem('userEmail'),
        searchall:true
    }

        axios.put(IP_backEnd+'/recruiter/logData',dataall)
        .then(response => {
            console.log("response for dashboard for all jobs")
            console.log(response.data.results)
          const info = response.data.results;
          console.log(response.data.results)
          let count = [];
          let job_id = [];
          let full_filled = [];
          info.forEach(element => {
            count.push(element.count);
            job_id.push(element._id.job_id);
          });
          console.log("title is "+count)
          console.log("Job Id "+job_id)
          this.setState({ 
            Dataall: {
              labels: job_id,
              datasets:[
                 {
                    label:'No of Applicants',
                    data: count,
                    backgroundColor: 'rgba(255,105,145,0.6)',
                 }
     

              ]
           }
           });
        }
        )

    }
    render() { 
        return ( 
        
        <div>
          
        <div className="w-50 h-50">
        <div>
        <h6 className="mt-5 text-center">
        <ul>Graph for a saved job per job posted:</ul></h6>
     
    <div>
           <Bar
            	data={this.state.Dataall}
              options={{
                maintainAspectRatio: false
              }}
          />
        </div>
          <div>
          </div>
          </div></div>
        </div>);
    }
}
 
export default Dashboard1;


// https://appdividend.com/2018/03/26/how-to-create-charts-in-react-js/
// https://www.youtube.com/watch?v=Ly-9VTXJlnA
// https://github.com/bradtraversy/reactcharts/blob/master/src/App.js