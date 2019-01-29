import React, { Component } from 'react';
import '../css/Profile.css';
import '../css/Home.css';
import '../css/Apply.css';
import Footer from './Footer';
import Loading from './Loading';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';
import axios from 'axios';
import { IP_backEnd, IP_NODE_PORT } from '../config/config';
import JobDisplay from './JobDisplay';


class EasyApply extends Component {
    constructor(props) {
        super(props);

        this.state = {
                firstName: "tyuk",
                lastName: "dhfjgkl",
                email: "fdhgfhjk",
                resume: "fdgfhjk",
                headLine: "gfhgjk",
                contactInfo: "fghgjkls"
          }
        {/* this.handleJobApplicationChange=this.handleJobApplicationChange.bind(this); */}
    this.submitJobApplication=this.submitJobApplication.bind(this);

    }


    submitJobApplication = (e) => {
        console.log("Inside Job Application submit", this.state);
        e.preventDefault();
        console.log(this.state);
        const data = this.state;
    var ackmessage;
    axios.defaults.withCredentials = true;
    if(this.state.email=="" || this.state.fName=="" || this.state.lastName==""){
        ackmessage="One or more required fields are empty. PLease fill the information."
    }
    else{
        axios.post(IP_backEnd + '/searchJob', data)
        .then(response => {
            if (response.status === 200) {
                alert("Applied to the position successfull !");
                ackmessage="sucess"
                
                console.log("Job Application successful, data inserted");
                // this.props.history.push('/Login');
            }
        })
        .catch((error) => {
            alert("Data invalid");
            console.log("Response status : ", error.response.status, "Response : ", error.response.data);
        })
    }
    this.setState({message:ackmessage})
    }

    renderRedirect = () => {
        if (this.props.redirectVar) {
            console.log("redirecting... email is ",this.state.email)
            sessionStorage.setItem('username', this.state.email);
            return <Redirect to='/easyApply' />
        }
    }

    render(){
        return(
            <div className="profilePageBody">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 column paddingBottom">
                            <div className=" profileCard borderMe">
                                <div className="coverPic">
                                    <img className="img-fluid"></img>
                                </div>
                                <div className="row borderMe">
                                    <div className="profilePic" >
                                        <img className="img-fluid"></img>
                                    </div>
                                    <div className="ml-auto paddingTop zoomMe">
                                        <i className="fal fa-pen editIcon marginRight2  broderRed" data-toggle="modal" data-target="#easyApplyModal" ></i>
                                    </div>
                                </div>
                                <div className="row insideCard">
                                    <div className="col-md-8 borderMe">
                                        <h3>Ranjith Cheguri</h3>
                                        <p>Actively seeking summer'19 Internship | pursuing Master's in Software Engineering, San Jose State University.</p>
                                        <p><span>San Jose</span><span>, California</span></p>
                                    </div>
                                    <div className="col-md-4 borderMe">
                                        <a><p><i class="fal fa-university profileIcons"></i><span>   University/Company</span></p></a>
                                        <a><p><i class="fal fa-address-book profileIcons"></i><span>    Contact Info</span></p></a>
                                        <a><i className="fal fa-users profileIcons"></i><span>   See Connections</span></a>
                                    </div>
                                </div>
                                <div className="row insideCard">
                                    <div className="dropdown borderMe">
                                        <button className="btn btn-primary linkedInBtn dropdown-toggle marginLeft" type="button" data-toggle="dropdown">Add profile section</button>
                                        <div className="dropdown-menu profileCard marginLeft">
                                            <a className="dropdown-item" href="#">Link 1</a>
                                            <a className="dropdown-item" href="#">Link 2</a>
                                            <a className="dropdown-item" href="#">Link 3</a>
                                        </div>
                                    </div>
                                    <div className="mr-auto  borderMe">
                                        <button className="btn btn-outline-dark linkedInBtn marginLeft"> more...</button>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </div>  
                    
                    
                    {/* EASY APPLY MODAL 1 */}
                    <div class="modal fade" id="easyApplyModal" tabindex="-1" role="dialog" aria-labelledby="easyApplyModalTitle" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="easyApplyModal">Apply to (company name)</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="row borderMe">
                                    <div className="profilePic-easyApply" >
                                        <img className="img-fluid"></img>
                                        <div className="ml-auto paddingLeft-easyApply paddingRight-easyApply ">
                                            <p>Actively seeking summer'19 Internship | pursuing Master's in Software Engineering, San Jose State University.
                                            <br></br><a href="/profile">Review Profile</a></p>
                                            {/* <p>{this.state.headLine}</p> 
                                        Review Profile link
                                        */}
                                        

                                        </div>
                                    </div>
                                </div>

                                {/* Image with name and summary */}

                                <div class="modal-body form">
                                <div class="row marginTop">
                                        <div class="col">
                                            <label className="">First Name</label>
                                            <input type="text" id="" className="form-control" name="firstName" value={this.state.firstName} onChange={this.handlePersonalProfileChange} ></input>
                                        </div>
                                        <div class="col">
                                            <label className="">Last Name</label>
                                            <input type="text" id="" className="form-control" name="lastName" value={this.state.lastName}onChange={this.handlePersonalProfileChange} ></input>
                                        </div>
                                    </div>
                                    <div class="row paddingLeft">
                                        <div class="column">
                                            <label className="">Email</label>
                                            <input type="text" id="" className="form-control" name="firstName" value={this.state.email} onChange={this.handlePersonalProfileChange}></input>
                                        </div>
                                    </div>
                                    <div class="row paddingLeft">
                                        <div class="column">
                                            <label className="">Phone</label>
                                            <input type="text" id="" className="form-control" name="contactInfo" value={this.state.contactInfo} onChange={this.handlePersonalProfileChange}></input>
                                        </div>
                                    </div>
                                    <div class="row marginTop">
                                        <div class="col-md-12 cursorMe" data-toggle="collapse" data-target="#experienceCollapse">
                                            <label className=""> Resume (Optional) </label>
                                            <input type="text" id="" className="form-control" name="resume" value={this.state.resume} onChange={this.handlePersonalProfileChange}></input>
                                        </div>
                                    </div>
                                    
                                    <div class="row paddingLeft">
                                        
                                            <p> We include a copy of your full profile with your application
                                            <br></br>
                                            <a href="">Learn</a> "what we do with your phone number and resume.</p>
                                       
                                    </div>
                                    <div>
                                        <input id="follow-company" type="checkbox" value="" checked/>
                                        <label>Follow Us</label>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary linkedInBtn" data-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-primary linkedInBtn" onClick={this.submitPersonalProfile}>Submit Application</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>





        );
    }
}

const mapStateToProps = (state) => ({
    redirectVar: state.loginState.redirectVar,
    response: state.loginState.response,
    errormessage:state.loginState.errormessage
})
export default EasyApply;




