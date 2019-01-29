import React, { Component } from 'react';
import Navbar from './RecHomeNavbar';
import Footer from './Footer';
import axios from 'axios';
import { IP_backEnd } from '../config/config';
import '../css/viewAllApplicants.css';
//Redux
import { connect } from 'react-redux';
import PDF from 'react-pdf-js';


class ViewAllApplicants extends Component {

  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      Applications: [],
      resume: ""
    }
  }

  componentDidMount() {
    //alert(this.props.location.state)
    axios.get(IP_backEnd + '/jobApplication?jobId=' + this.props.location.state)
      .then(response => {
        console.log(response.data)
        this.setState({
          Applications: this.state.Applications.concat(response.data),
        })
      })
  }

  onResumeClose=()=>{
    this.setState({
      resume:""
    })
  }

  getResume = async (email) => {
    console.log("fetching user resume");
    await axios.get(IP_backEnd + '/userProfile/getResume/?email=' + email)
      .then((res) => {
        if (res.data !== "OK") {
          this.setState({
            resume: res.data
          })
        } else {
          console.log("empty resume base64 value ", res.data);
        }
      })
  }


  render() {

    var resumeDiv;
    if (this.state.resume) {
      var pdf = `data:application/pdf;base64,${this.state.resume}`;
      resumeDiv = (
        <div>
          <PDF file={pdf} />
        </div>
      );
    } else {
      resumeDiv = (
        <div>
          <p>No resume found</p>
        </div>
      );
    }


    let renderApplications = this.state.Applications.map(application => {
      return (
        <tr>
          <div className="mt-3 ml-4 mr-4 border rounded shadow">
            <h4 className="ml-2 pl-2 pt-2">Name : {application.firstName + " " + application.lastName}</h4>
            <p className="ml-2 pl-2">Email ID : {application.email}</p>
            <p className="ml-2 pl-2">Address : {application.address}</p>
            <p className="ml-2 pl-2 pb-1"><a data-toggle="modal" onClick={()=>{this.getResume(application.email)}} data-target="#viewResume" >Resume</a></p>
          </div>
        </tr>
      )
    })

    return (
      <div>
        <Navbar/> 
        <div class="container">
          <h3>Applications</h3>
          <div class="applications-table">
            <table class="table w-100">
              <tbody>
                {renderApplications}
              </tbody>
            </table>
          </div>
        </div>
        <div class="modal fade" id="viewResume" tabindex="-1" role="dialog" aria-labelledby="viewResumeModal" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="viewResumeTitle">Resume</h5>
                <button type="button" class="close linkedInBtn" data-dismiss="modal" onClick={()=>this.onResumeClose()} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                {resumeDiv}
                {/* <div class="row marginTop">
                                            <div class="col-md-12">
                                                <input type="file" id="" className="form-control" name="profilePic" onChange={this.handleProfilePicChange} />
                                            </div>
                                        </div> */}
              </div>
              <div class="modal-footer">
                <button type="button" className="btn btn-primary linkedInBtn" onClick={()=>this.onResumeClose()} data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({ applicationState }) => ({
  applicationState,
})

export default connect(mapStateToProps)(ViewAllApplicants);
