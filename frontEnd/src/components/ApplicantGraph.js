import React, { Component } from 'react'
import axios from 'axios';
import { Chart, Pie, Line, Bar } from 'react-chartjs-2';
import { IP_backEnd } from '../config/config.js'

class ApplicantGraph extends Component {

    constructor(props){
        super(props);
        this.state = {
            data : {},
            isDataRecevied:false
        }
    }

    async componentDidMount(){
        // alert("Inside did mount");
        await axios.get(IP_backEnd+'/viewCount?email='+window.localStorage.getItem('userEmail'))
            .then(response => {
                if(response.data){
                    console.log(response.data)
                this.setState({
                    data : response.data.personalProfile.views,
                    isDataRecevied:true
                })
            }
            })
    }

  render() {
    // console.log(this.state.data);

    let labels;
    let data;
    let chartData;

    if(window.localStorage.getItem('userEmail')=='rk@gmail.com'){
        labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 33, this.state.data];
        chartData = {
            labels: labels,
            datasets: [{
                label: "date",
                data: data,
                backgroundColor: 'rgba(255,105,145,0.6)',
            }],    }
        } else {

        if (this.state.isDataRecevied) {
            labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
            data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, this.state.data];
            chartData = {
                labels: labels,
                datasets: [{
                    label: "date",
                    data: data,
                    backgroundColor: 'rgba(255,105,145,0.6)',
                }],
            }
        } else {
            labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
            data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            chartData = {
                labels: labels,
                datasets: [{
                    label: "date",
                    data: data,
                    backgroundColor: 'rgba(255,105,145,0.6)',
                }],
            }
        }

        }

    
   

    return (
      <div>
          <h4>Profile Views/month</h4>
        <Bar data={chartData}
                options={{
                    maintainAspectRatio: false
                }}/>
      </div>
    )
  }
}

export default ApplicantGraph;