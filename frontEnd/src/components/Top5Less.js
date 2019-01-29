import React, { Component } from 'react';
import axios from 'axios';
import { Chart } from "react-charts";
import {Bar} from 'react-chartjs-2';

class Top5Less extends Component {

  constructor(props) {
    super(props);
    this.state = {
        job     : [],
        labels  : [],
        data    : []
    }
  }

  componentDidMount(){
    console.log("inside component did mount")
    axios.get("http://localhost:3002/bottomTop5",{
        params: {
             email : window.localStorage.getItem("userEmail")
        //   email   :   "aditi12395@gmail.com"
        }
    })
            .then(response => {
                console.log(response);
                this.setState({
                    job :   response.data.jobs
                },
                ()=>{
                        let labels=[];
                        let data=[];
                        this.state.job.forEach((ele)=>{
                            labels.push(ele._id);
                        })
                        this.state.job.forEach((ele)=>{
                            data.push(ele.count);
                        })
                        this.setState({
                            labels  : [...labels],
                            data    : [...data]
                    },()=>{
                        console.log("Displaying state",this.state)
                    })
                })
            }).catch(err=>{
                console.log(err);
            })
  }



  render() {
      console.log("State Data",this.state.data);
      let charData={
        labels: [...this.state.labels],
        datasets:[{
            label           : "Top 5 job posting with less number of applications",
            data            : [...this.state.data],
            backgroundColor : 'rgba(75,192,192,0.6)'
        }]
      }
      return(
        <div className="chart">
            <Bar
                data={charData}
                options={{}}
            />
        </div>
      )
  }
}

export default Top5Less
