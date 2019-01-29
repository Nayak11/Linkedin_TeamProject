import React, { Component } from 'react';
import axios from 'axios';
import { Chart } from "react-charts";
import {Bar, Pie} from 'react-chartjs-2';

class GetTop10 extends Component {

  constructor(props) {
    super(props);
    this.state = {
        job     : [],
        labels  : [],
        data    : [],
        month   : null
    }
  }

  componentDidMount(){
    axios.get("http://localhost:3002/getTop10",{
        params: {
            email : window.localStorage.getItem("userEmail")
            // email   :   "aditi12395@gmail.com"
        }
    })
            .then(response => {
                console.log(response);
                this.setState({
                    job :   response.data.jobs
                },
                ()=>{
                        console.log(this.state.job)
                        let labels=[];
                        let monthLabel={
                            "January"   : 0,
                            "February"  : 1,
                            "March"     : 2,
                            "April"     : 3,
                            "May"       : 4,
                            "June"      : 5,
                            "July"      : 6,
                            "August"    : 7,
                            "September" : 8,
                            "October"   : 9,
                            "November"  : 10,
                            "December"  : 11,
                        }; 

                        let job = this.state.job;
                        let appData={};

                        this.state.job.forEach((ele)=>{
                            if(ele.jobID!=null || ele.jobID!=undefined)
                                labels.push(ele.jobID);
                        })

                        labels=labels.filter(function(item, pos) {
                            return labels.indexOf(item) == pos;
                        })

                        for(let i=0;i<labels.length;i++){
                            let arr=[];
                            for(let j=0;j<12;j++){
                                arr.push(0);
                            }
                            appData[labels[i]] = arr;
                        }

                        for(let i=0; i<job.length; i++){
                            if(job[i].hasOwnProperty("month")){
                                // console.log(job[i].jobId, )
                                appData[job[i].jobID][monthLabel[job[i].month]] += 1;
                            }
                        }

                        console.log(appData,typeof appData);  
                        console.log("Job ID's",labels); 

                        let data=[]
                        data=Object.entries(appData)
                        console.log("After using entries",data);

                        this.setState({
                            data    : data,
                            month   : monthLabel,
                            labels  : labels
                        })

                })
            }).catch(err=>{
                console.log(err);
            })
  }



  render() {

    let dispChart=[];
    let colorArray=["red","green","blue","orange","yellow","pink","brown","black","silver","salmon","tea","jungle"]

    for(let i=0;i<this.state.data.length;i++){
        this.state.data[i][2]=colorArray[i];
        console.log("Inside for ",this.state.data[i][1])
        dispChart.push({
            label           :   this.state.data[i][0],
            data            :   this.state.data[i][1],
            backgroundColor :   this.state.data[i][2]
        })
    }


    console.log("Display chart",dispChart)
    console.log("..............",this.state.labels);

    let charData={
        labels  : [1,2,3,4,5,6,7,8,9,10,11,12],
        //labels  : [1,2,3,4,5],
        datasets: dispChart
         //datasets: [
           // {label: "Month", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0], backgroundColor: "rgba(75,192,192,0.6)"}
            //{label: "Month", data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0], backgroundColor: "rgba(75,192,192,0.6)"}
         //]


        // labels: ["Jan","Feb","Mar","Apr","May"],
        // datasets: [{
        //     label: "1",
        //     backgroundColor: "blue",
        //     data: [7, 8, 3 ,4,3]
        // }, {
        //     label: "2",
        //     backgroundColor: "red",
        //     data: [7, 8, 13,4,4]
        // }, {
        //     label: "3",
        //     backgroundColor: "green",
        //     data: [7, 12, 3,4,3]
        // }]
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

export default GetTop10
