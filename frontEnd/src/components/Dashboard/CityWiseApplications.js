import React, { Component } from 'react';
import axios from 'axios';
import { IP_backEnd } from '../../config/config';
import { Chart, Pie, Line, Bar } from 'react-chartjs-2';


class CityWiseApplications extends Component {

    constructor(props){
        super(props);
        this.state = {
            Data : [],
            data:[],
            labels : [],
            month : null,
            jobs : [],
            currentJobID : null,
        }
    }

    componentDidMount(){
        axios.get(IP_backEnd+'/recruiter/getPostedJobs?email=aditi12395@gmail.com')//+window.localStorage.getItem('userEmail'))
            .then(response=>{
                this.setState({
                    jobs : this.state.jobs.concat(response.data.result) 
                })
            })


        
    }

    dropdownClickHandler = (jobID) => {
        this.setState({
            currentJobID : jobID
        })
        axios.get(IP_backEnd + '/dashboard/city?jobID='+jobID)
            .then(response => {
                // let resData = response.data;
                // var datasetArray = [];
                // var dataset = resData.map(data => {

                // })
                this.setState({
                    Data: response.data
                }, () => {
                    let Data = this.state.Data;
                    console.log(this.state.job)
                    let labels = [];
                    let monthLabel = {
                        "January": 0,
                        "February": 1,
                        "March": 2,
                        "April": 3,
                        "May": 4,
                        "June": 5,
                        "July": 6,
                        "August": 7,
                        "September": 8,
                        "October": 9,
                        "November": 10,
                        "December": 11,
                    }

                    let appData = {};
                    this.state.Data.forEach((ele) => {
                        if (ele._id.city != null || ele._id.city != undefined)
                            labels.push(ele._id.city);
                    })



                    labels = labels.filter(function (item, pos) {
                        return labels.indexOf(item) == pos;
                    })



                    for (let i = 0; i < labels.length; i++) {
                        let arr = [];
                        for (let j = 0; j < 12; j++) {
                            arr.push(0);
                        }
                        appData[labels[i]] = arr;
                    }

                    // console.log(appData);

                    // console.log("Data",Data);

                    for (let i = 0; i < Data.length; i++) {
                        if (Data[i]._id.month && Data[i]._id.city) {
                            // console.log("Hello");
                            // console.log(Data[i]._id.city + Data[i]._id.month)
                            appData[Data[i]._id.city][monthLabel[Data[i]._id.month]] = Data[i].applicationCount;
                        }
                    }

                    // console.log(appData);

                    let data = []
                    data = Object.entries(appData)
                    // console.log("After using entries", data);

                    this.setState({
                        data: data,
                        month: monthLabel,
                        labels: labels
                    })

                })
            })
    }

  render() {
        // var 
        // let renderDataSet = this.state.Data.map(dataset => {
        //     dataset.
        // })
        // console.log(this.state.data);

        let renderJobIDs = this.state.jobs.map(job => {
            return(
                <a className="dropdown-item" onClick={()=>this.dropdownClickHandler(job.job_id)}>{job.job_id}</a>
            )
        })


      let dispChart = [];

      for (let i = 0; i < this.state.data.length; i++) {
          console.log("Inside for ", this.state.data[i][1])
          dispChart.push({
              label: this.state.data[i][0],
              data: this.state.data[i][1],
              backgroundColor: 'rgba(75,192,192,0.6)'
          })
      }

      let charData = {
          labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          //labels  : [1,2,3,4,5],
          datasets: dispChart
      }

    return (
      <div>
          <div className="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select a Job ID
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {renderJobIDs}
                </div>
          </div>
        <Bar data={charData}/>
      </div>
    )
  }
}

export default CityWiseApplications;