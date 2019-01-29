import React, { Component } from 'react';
import axios from 'axios';
import {IP_backEnd} from '../config/config';
import Navbar from './Navbar';
import Footer from './Footer';

class ApplicantDashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            Applications : [],
        }
    }

    componentDidMount(){
        axios.get(IP_backEnd+'/applicant/applications?applicantEmail='+window.localStorage.getItem('userEmail'))
            .then(response => {
                this.setState({
                    Applications : this.state.Applications.concat(response.data)
                })
            })

    }

  render() {
      let applicationDetails = this.state.Applications.map((application)=> {
          return(
              <tr>
                  <td>{application.company}</td>
                  <td>{application.title}</td>
                  <td>{application.description}</td>
                  <td>{application.location}</td>
                  <td>{application.company_url}</td>
                  <td>{application.type_of_apply}</td>
              </tr>
          )
      })
    return (
      <div class="container">
      {/* <Navbar/> */}
        <table class="table">
            <thead>
                <th>Company</th>
                <th>Title</th>
                <th>Description</th>
                <th>Location</th>
                <th>URL</th>
                <th>Type of Apply</th>
            </thead>
            <tbody>
                {applicationDetails}
            </tbody>
        </table>
        <Footer/>
      </div>
    )
  }
}

export default ApplicantDashboard;