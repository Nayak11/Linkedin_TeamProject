import React, { Component } from 'react';
import LogSaveJob from './logSavedJob';
import {Chart,Pie,Line,Bar} from 'react-chartjs-2'
import axios from "axios";
import NavBar from './Navbar';
import CityWiseApplications from './Dashboard/CityWiseApplications';
import GetTop10 from './GetTop10';
import Top5Less from './Top5Less';
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'
import Navbar from './RecHomeNavbar'
import Dashboard1 from './3rdgraph.js';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          Data:"",
          Dataall:""
        }
      } 
            
              // planetData :{
              //   labels: ['Boston', 'Worcester', 'San Jose', 'New York', 'Seattle', 'Fremont'],
              //   datasets: [   {
                    
              //     label:'Half filled application',
              //     data:[
              //       124,
              //       145,
              //       130,
              //       106,
              //       116,
              //       57
              //     ],
              //     backgroundColor: 'rgba(99, 132, 0, 0.6)',
              //     width:'20cm'
              //   }, {
              //     label:'Full filled',
                  
              //     data:[
              //       70,
              //       120,
              //       153,
              //       106,
              //       105,
              //       50
              //     ],
              //     backgroundColor:
              //     'rgba(75, 192, 192, 0.6)',
                   
              //   }, {
              //     label:'Read',                 
              //     data:[
              //       75,
              //       185,
              //       153,
              //       65,
              //       101,
              //       95
              //     ],
              //     backgroundColor:
              //       'rgba(255, 99, 132, 0.6)'
              //       }]
              // }
       
    componentDidMount() {
      console.log("I am here")
      const data={
          job_id:1,
          search:true
      }

      const dataall={
        recruiter_email:localStorage.getItem('userEmail'),
        searchall:true
    }


      axios.put(IP_backEnd+'/recruiter/logData',data)
        .then(response => {
            console.log("response for dashboard")
            console.log(response.data.results)
          const info = response.data.results;
          console.log(response.data.results)
          let city = [];
          let half_filled = [];
          let full_filled = [];
          let clicks = [];
          info.forEach(element => {
            city.push(element.city);
            half_filled.push(element.half_filled-element.full_filled);
            full_filled.push(element.full_filled);
            clicks.push(element.clicks-element.half_filled-element.full_filled);
          });
          console.log("title"+city)
          console.log(half_filled)
          console.log(full_filled)
          console.log(clicks)
          this.setState({ 
            Data: {
              labels: city,
              datasets:[
                 {
                    label:'Half Filled ',
                    data: half_filled,
                    backgroundColor: 'rgba(255,105,145,0.6)',
                 },
                 {
                  label:'Full Filled',
                  data: full_filled,
                  backgroundColor: 'rgba(75, 192, 192, 0.6)',
                 }, {
                  label:'Only Read',                 
                  data:clicks,
                  backgroundColor:
                    'rgba(255, 99, 132, 0.6)'
                    }

              ]
           }
           });
        }
        )


        // axios.put(IP_backEnd+'/recruiter/logData',dataall)
        // .then(response => {
        //     console.log("response for dashboard for all jobs")
        //     console.log(response.data.results)
        //   const info = response.data.results;
        //   console.log(response.data.results)
        //   let count = [];
        //   let job_id = [];
        //   let full_filled = [];
        //   info.forEach(element => {
        //     count.push(element.count);
        //     job_id.push(element._id.job_id);
        //   });
        //   console.log("title is "+count)
        //   console.log("Job Id "+job_id)
        //   this.setState({ 
        //     Dataall: {
        //       labels: job_id,
        //       datasets:[
        //          {
        //             label:'No of Applicants',
        //             data: count,
        //             backgroundColor: 'rgba(255,105,145,0.6)',
        //          }
        // // //          {
        // // //           label:'Full Filled',
        // // //           data: full_filled,
        // // //           backgroundColor: 'rgba(75, 192, 192, 0.6)',
        // // //          }, {
        // // //           label:'Only Read',                 
        // // //           data:clicks,
        // // //           backgroundColor:
        // // //             'rgba(255, 99, 132, 0.6)'
        // // //             }

        //       ]
        //    }
        //    });
        // }
        // )

    }
    render() { 
        return ( 
        
        <div>
            <Navbar />
          <h6 className="text-center text-danger">Admin Dashboard</h6>
        <div className="w-50 h-50">
        <div>
        <h6 className="mt-5 text-center">
        <ul>Graph for a clicks per job application:</ul></h6>
        <LogSaveJob />
        <div className="w-50 h-50">
            <Bar
            	data={this.state.Data}
              options={{
                maintainAspectRatio: false
              }}
          />
    </div>
    <Dashboard1 />
    <div>
           {/* <Bar
            	data={this.state.Dataall}
              options={{
                maintainAspectRatio: false
              }}
          /> */}
        </div>
          
          <h6 className="mt-5 text-center">
          <ul>Graph for all jobs posted by you: No of applicants saved the job</ul></h6>
          {/* <LogSaveJob /> */}
          </div>
          </div>
        );
          <h6 className="mt-5 text-center">Top 5 Job Postings with Less number of Applications</h6>
          <Top5Less/>
          <h6 className="mt-5 text-center">Top 10 Job Postings with applications/month</h6>
          <GetTop10/>
          <h6 className="mt-5 text-center">City wise applications/month</h6>
          <CityWiseApplications/>

        </div>
        );
    }
}
 
export default Dashboard;


// https://appdividend.com/2018/03/26/how-to-create-charts-in-react-js/
// https://www.youtube.com/watch?v=Ly-9VTXJlnA
// https://github.com/bradtraversy/reactcharts/blob/master/src/App.js