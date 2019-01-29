import React, { Component } from 'react';
import '../css/Profile.css';
import axios from 'axios';
import { IP_backEnd } from '../config/config';
import { connect } from "react-redux";


class savedJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: localStorage.getItem('userEmail'),
            savedJobs: [],
            savedJobsDetails: [],
            modal: ""
        }
    }

    componentDidMount = async () => {
        await this.getsavedJobsList();
        //await this.getSavedJobDetails();

        setTimeout(() => {
            this.getSavedJobDetails();
        }, 1000);
    }

    getSavedJobDetails = () => {
        const data = {
            "savedJobs": this.state.savedJobs
        }
        console.log("retrieveing the job details of...", data);
        axios.post(IP_backEnd + '/getSavedJobs', data)
            .then((res) => {
                console.log(res.data);
                this.setState({
                    savedJobsDetails: res.data.result
                })
            })
    }

    getsavedJobsList = () => {
        axios.get(IP_backEnd + '/userProfile/?email=' + this.state.email)
            .then((res) => {
                console.log("SAVED JOBS LIST RECEIVED ", res.data[0]);
                this.setState({
                    savedJobs: res.data[0].savedJobs
                })
            });
    }
    

    redirectToApplyJob = () => {

    }

    handleHalffilled1 = (operation, email, company, title, location, type) => {
        if (type == "easyapply") {
            console.log("I am called for half filled east", "EASY APPLY")
            localStorage.setItem('easyapplyid', operation)
            this.props.applyWindow(operation)
            localStorage.setItem('recruiteremail', email)
            localStorage.setItem('easycompany', company)
            localStorage.setItem('easytitle', title)
            localStorage.setItem('easylocation', location)
            console.log(this.props.applyid)

            const data = {
                clicks: 0,
                job_id: operation,
                recruiter_email: email,
                city: localStorage.getItem('userCity'),
                // city:window.localStorage.getItem('city'),
                half_filled: 1,
                full_filled: 0
            }
            this.props.logData(data)
        } else {
            console.log("I am called for half filled", "APPLY")
            this.props.applyWindow(operation)
            console.log(this.props.applyid)
            localStorage.setItem('jobapplyid', operation)
            console.log(localStorage.getItem('jobapplyid'))
            localStorage.setItem('applycompany', company)
            localStorage.setItem('applytitle', title)
            localStorage.setItem('applylocation', location)
            localStorage.setItem('applyrecruiteremail', email)
            window.open("/apply", "_blank")

            const data = {
                clicks: 0,
                job_id: operation,
                recruiter_email: email,
                city: localStorage.getItem('userCity'),
                // city:window.localStorage.getItem('city'),
                half_filled: 1,
                full_filled: 0
            }
            this.props.logData(data)
        }


    }

    displayJob = () => {
        //this.props.history.push("/jobDisplay")
    }

    render() {
        console.log(this.state.savedJobsDetails);
        if (this.state.savedJobsDetails) {
            var jobsList = this.state.savedJobsDetails.map(job => {
                return (<div className="row col-md-12 paddingTop ">
                    <div className="col-md-2"><img></img></div>
                    <div className="col-md-8  skills">
                        <a onClick={this.displayJob()}>
                            <div className="col-md-12"><h5>{job.title}</h5></div>
                            <div className="col-md-12">{job.company}</div>
                            <div className="col-md-12">{job.location}</div>
                        </a>
                    </div>
                    <div className="col-md-2">
                        {(job.type_of_apply == "easyapply") ? <button className="btn btn-primary linkedInBtn" data-toggle="modal" data-target="#easyApplyModal" onClick={() => this.handleHalffilled1(job.job_id, job.recruiter_email, job.company, job.title, job.location, job.type_of_apply)}>{job.type_of_apply}</button> : <button className="btn btn-primary linkedInBtn" onClick={() => this.handleHalffilled1(job.job_id, job.recruiter_email, job.company, job.title, job.location, job.type_of_apply)}>{job.type_of_apply}</button>}
                    </div>
                </div>);
            })
        } else {
            var jobsList = (<div>Loading...</div>)
        }

        return (<div className="container">
            <div className="free-space"></div>
            <div className="row container">
                <div className="col-md-10">
                    <div className="col-md-12 profileCard shadow-lg ml-3">
                        <div className="pt-4 pl-3">
                            <h2> Saved Jobs List</h2>
                        </div>
                        <div className="pt-2 pl-3">
                            {jobsList}
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="easyApplyModal" tabindex="-1" role="dialog" aria-labelledby="easyApplyModalTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="easyApplyModal">Apply to {localStorage.getItem('easycompany')}</h5>
                            <h5 class="modal-title" id="easyApplyModal">{localStorage.getItem('easytitle')}</h5>
                            <h5 class="modal-title" id="easyApplyModal"> {localStorage.getItem('easylocation')}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        {/*<div className="row borderMe">
                                    <div className="profilePic-easyApply" >
                                        <img className="img-fluid"></img>
                                        <div className="ml-auto paddingLeft-easyApply paddingRight-easyApply ">
                                            <p>Actively seeking summer'19 Internship | pursuing Master's in Software Engineering, San Jose State University.
                                            <br></br><a href="/profile">Review Profile</a></p>
                                             <p>{this.state.headLine}</p> 
                                        Review Profile link
                                        
                                        

                                        </div>
                                    </div>
                                </div>*/}

                        {/* Image with name and summary */}

                        <div class="modal-body form">
                            <div class="row marginTop">
                                <div class="col">
                                    <label className="">First Name</label>
                                    <input type="text" id="" className="form-control" name="firstName" value={this.state.firstName} onChange={this.handlePersonalProfileChange} ></input>
                                </div>
                                <div class="col">
                                    <label className="">Last Name</label>
                                    <input type="text" id="" className="form-control" name="lastName" value={this.state.lastName} onChange={this.handlePersonalProfileChange} ></input>
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
                                    <input type="text" id="" className="form-control" name="resume" value="Resume taken from Linkedin" onChange={this.handlePersonalProfileChange} disabled></input>
                                </div>
                            </div>

                            <div class="row paddingLeft">

                                <p> We include a copy of your full profile with your application
                                            <br></br>
                                    <a href="">Learn</a> "what we do with your phone number and resume.</p>

                            </div>
                            <div>
                                <input id="follow-company" type="checkbox" value="" checked />
                                <label>&nbsp;Follow Us</label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary linkedInBtn" data-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary linkedInBtn" onClick={this.submitJobApplication}>Submit Application</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        logData: (data) => {
            axios.put(IP_backEnd + '/recruiter/logData', data)
                .then((response) => {
                    dispatch({ type: 'FULLDETAILS', payload: response.data, statusCode: response.status })
                });
        },
        applyWindow: (operation) => {
            console.log("inside reducer call: before " + operation)
            dispatch({ type: 'JOB_ID', payload: operation })
        }

    }
}

const mapStateToProps = state => {
    return {
        jobdetails: state.jobDisplay.jobdetails,
        history: state.history,
        jobid: state.jobDisplay.jobid,
        applyid: state.jobDisplay.applyid
    };
}

export default connect(mapStateToProps, mapDispatchStateToProps)(savedJobs);
