import React, { Component } from 'react';
import Navbar from './Navbar';
import { connect } from "react-redux";
import axios from "axios";
import { Link } from 'react-router-dom';
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'
import '../css/Jobdisplay.css';
import EasyApply from './EasyApply';
import '../css/Profile.css';

class JobDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            searchjob: null,
            searchlocation: null,
            experience_level: "",
            type_of_apply: "any",
            company: "",
            timelapse: 23445,
            applydisplay: "",
            firstName: "",
            lastName: "",
            email: "",
            resume: "",
            headLine: "",
            contactInfo: ""
        }
        this.handleEvent = this.handleEvent.bind(this)
        this.handleArray = this.handleArray.bind(this)
        this.submitJobCriteria = this.submitJobCriteria.bind(this)
        this.submitAdvanceJobCriteria = this.submitAdvanceJobCriteria.bind(this)
        this.submitJobApplication = this.submitJobApplication.bind(this);
    }



    async componentDidMount() {
        const data = { email: localStorage.getItem('userEmail') }
        this.props.submitJobDisplay(data)
        this.setState({ id: this.props.jobid })
        //alert(localStorage.getItem('userEmail'))
        await axios.get(IP_backEnd + `/userProfile?email=${localStorage.getItem('userEmail')}`)
            .then((res) => {
                console.log("Getting user profile");
                //console.log(res.data[0].personalProfile.firstName);
                if (res.status == 200) {
                    this.setState({
                        email: localStorage.getItem('userEmail'),
                        firstName: res.data[0].personalProfile.firstName,
                        lastName: res.data[0].personalProfile.lastName,
                        contactInfo: res.data[0].personalProfile.contactInfo
                    })
                    //console.log(this.state)
                }
            }).catch(err => {
                console.log(err);
            })
    }


    submitJobApplication = (e) => {
        console.log("Inside Job Application submit", this.state);
        e.preventDefault();
        console.log(this.state);
        const jobdata = {
            jobID: localStorage.getItem('easyapplyid'),
            resume: "",
            email: localStorage.getItem('userEmail'),
            cover: "",
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: "",
            city: localStorage.getItem('userCity'),
            month: "December",
            hear: "",
            sponsorship: "",
            disability: "",
            resume: '',
            tempResume: '',
            isNewResumeUploading: false,
        };
        var ackmessage;
        axios.defaults.withCredentials = true;
        if (this.state.email == "" || this.state.fName == "" || this.state.lastName == "") {
            ackmessage = "One or more required fields are empty. PLease fill the information."
        }
        else {
            axios.post(IP_backEnd + '/jobApplication/apply', jobdata)
                .then(response => {
                    if (response.status === 200) {
                        alert("Applied to the position successfull !");
                        ackmessage = "sucess"

                        console.log("Job Application successful, data inserted");
                        // this.props.history.push('/Login');
                    }
                })
                .catch((error) => {
                    alert("Data invalid");
                    console.log("Response status : ", error.response.status, "Response : ", error.response.data);
                })

            const data = {
                clicks: 0,
                job_id: localStorage.getItem('easyapplyid'),
                recruiter_email: localStorage.getItem('recruiteremail'),
                city: localStorage.getItem('userCity'),
                // city:window.localStorage.getItem('city'),
                half_filled: 0,
                full_filled: 1
            }
            this.props.logData(data)
            console.log("Inside handleNew")

        }

        this.setState({ message: ackmessage })
    }

    handleSaveJob = (operation, email, title) => {

        const data1 = {
            saveJob: operation,
            email: localStorage.getItem('userEmail'),
        }
        // alert(data1.saveJob+data1.email)
        axios.put(IP_backEnd + '/savejob', data1)
            .then(response => {
                if (response.status === 200) {
                    alert("saved successfull !");


                    console.log("Job Application successful, data inserted");
                    // this.props.history.push('/Login');
                }
            })

        const data = {
            job_id: operation,
            recruiter_email: email,
            title: title,
            saved_job: 1
        }

        axios.put(IP_backEnd + '/logSavedJob', data)
            .then(response => {
                if (response.status === 200) {
                    alert("saved successfull !");
                    console.log("Job Application successful, data inserted");
                    // this.props.history.push('/Login');
                }
            })


    }


    handleEvent(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value,

        });

        console.log("Hello")
    }

    handleArray(e) {

        let target = e.target;
        let value = target.value;
        console.log(value)
        this.setState({ experience_level: this.state.experience_level.concat(value + ",") })
        console.log("Hello in select checkbox")
    }

    resetJob = (e) => {
        console.log("reset data of type of apply")
        this.setState({ type_of_apply: "any" })
        // this.submitAdvanceJobCriteria()
        const data = {
            email: localStorage.getItem('userEmail'),
            search: true,
            searchjob: this.state.searchjob,
            searchlocation: this.state.searchlocation,
            experience_level: e.target.id == "reset" ? "" : this.state.experience_level,
            type_of_apply: this.state.type_of_apply,
            company: this.state.company,
            timelapse: this.state.timelapse
        }
        this.props.submitAdvanceJobSearch(data)
    }


    submitJobCriteria(e) {
        console.log("Hello")
        console.log(this.state.searchjob)
        if (this.state.searchjob == null || this.state.searchlocation == null || this.state.searchjob == "" || this.state.searchlocation == "")
            window.alert("First enter search criteria")
        else {
            const data = {
                searchonly: true,
                searchjob: this.state.searchjob,
                searchlocation: this.state.searchlocation,
                email: localStorage.getItem('userEmail')
            }
            this.props.submitJobSearch(data)
        }
    }
    submitAdvanceJobCriteria(e) {
        console.log("target type" + e.target)
        console.log("Hello")
        console.log(this.state.searchjob)
        if (this.state.searchjob == null || this.state.searchlocation == null)
            window.alert("First enter search criteria")
        else {
            const data = {
                email: localStorage.getItem('userEmail'),
                search: true,
                searchjob: this.state.searchjob,
                searchlocation: this.state.searchlocation,
                experience_level: e.target.id == "resetexperience" ? "" : this.state.experience_level,
                type_of_apply: e.target.id == "resettypeofapply" ? "any" : this.state.type_of_apply,
                company: e.target.id == "resetcompany" ? "" : this.state.company,
                timelapse: e.target.id == "resettimelapse" ? "30000" : this.state.timelapse,
            }
            this.props.submitAdvanceJobSearch(data)
        }
    }

    handleNew(operation, email) {
        console.log("reaced inside" + operation + email)
        console.log("operation")
        this.setState({ id: operation })

        const formData = {
            jobId: operation,
            email: localStorage.getItem('userEmail')
        }
        axios.post(IP_backEnd + '/singleJobApplication', formData)
            .then((response) => {
                console.log(response.data);
                this.setState({ applydisplay: response.data })
            });

        const data = {
            clicks: 1,
            job_id: operation,
            recruiter_email: email,
            city: localStorage.getItem('userCity'),
            // city:window.localStorage.getItem('city'),
            half_filled: 0,
            full_filled: 0
        }
        this.props.logData(data)
        console.log("Inside handleNew")


    }

    handleHalffilled1 = (operation, email, company, title, location) => {
        console.log("I am called for half filled east")
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

    }

    handleHalffilled = (operation, email, company, title, location) => {
        console.log("I am called for half filled")
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

    getCompanyLogo = async (email) => {
        //console.log("fetching user profile pic...");
        //alert("inside company logo");
        await axios.get(IP_backEnd + '/recruiter/logoDownload?email=' + email)
            .then((res) => {
                console.log("base64 Logo received");
                //console.log("response from AWS S3 bucket... ", res.data);
                //alert(res.data);
                this.setState({
                    companyLogoBase64: [...this.state.companyLogoBase64, res.data]
                })
            })
    }



    render() {

        var tempDate = new Date() - new Date("2018-11-24T07:04:13.000Z");
        console.log(tempDate)
        var day = 1000 * 60 * 60 * 24;
        var hours = 1000 * 60 * 60
        var hours = Math.floor(tempDate / hours)
        var days = Math.floor(tempDate / day);
        var months = Math.floor(days / 31);
        console.log("hours" + hours)
        console.log(days)
        console.log(months)
        var a = hours > 24 ? days + "days ago" : hours + "hours ago"
        console.log(a)

        console.log("particular job id" + this.props.jobid)
        var details, fulldetails
        if (this.props.jobdetails.length == 0) {
            details = <h4 className="text-danger text-center">No job matches your search criteria! Search again</h4>
        }
        else {
            // Displaying whole list
            // <h6>Showing {this.props.jobdetails.length} results</h6>
            console.log("******************************************************************************************************************************************************************************************************************************************************************************************************************************************", this.props.jobdetails);
            details =
                this.props.jobdetails.map((job, index) => {
                    //alert(index)
                    var al
                    var tempDate = new Date() - new Date(job.posted_date_time);
                    console.log(tempDate)
                    var day = 1000 * 60 * 60 * 24;
                    var hours = 1000 * 60 * 60
                    var hours = Math.floor(tempDate / hours)
                    var days = Math.floor(tempDate / day);
                    var months = Math.floor(days / 31);
                    //this.getCompanyLogo(job.recruiter_email);
                    //console.log("hours" + hours)
                    //console.log(days)
                    //console.log(months)
                    var diffdate = hours > 24 ? days + " days ago" : hours + " hours ago"
                    if (months > 0)
                        diffdate = months + " months ago"

                    if (job.type_of_apply == "easyapply")
                        al = (<span><i className=" fa fa-lg text-primary fa-linkedin-square"></i>
                            <span className="ml-1">Easy Apply</span></span>)
                    else
                        al = (<span className="ml-1 text-primary">Apply</span>)
                    return (
                        <div>
                            <div className="row smooth-scroll  ">

                                <div className="col-lg-4 mt-2">
                                    {/* {(this.state.companyLogoBase64[index]) ? <img className="img-fluid ml-2 mr-2" src={'data:image/jpeg;base64,' + this.state.companyLogoBase64[index]} /> : <img className="img-fluid ml-2 mr-2" src={require('../images/1.jpg')} />} */}
                                    <img className="img-fluid ml-2 mr-2" src={require('../images/1.jpg')} />
                                </div>
                                <div className="col-lg-7 mt-2 ml-2">
                                    <button className="btn btn-link m-0 p-0 text-primary text-capitalize" onClick={() => this.handleNew(job.job_id, job.recruiter_email)}><h5>{job.title}</h5></button>
                                    <h6 className="text-capitalize m-0 p-0">{job.company}</h6>
                                    <div className="text-muted text-capitalize">{job.location}</div>
                                    <div className="jobdescribe"><small>{job.description}</small></div>
                                    <div className="text-muted">
                                        <small>{diffdate} -{al}</small></div>
                                    <hr></hr>
                                </div>
                            </div>
                        </div>)
                })
        }

        if (this.props.jobdetails.length == 0) {
            fulldetails = <h4 className="text-danger text-center">No job posting matches your search criteria! Search again</h4>
        }
        else {

            // <h6>Showing {this.props.jobdetails.length} results</h6>
            // Displaying particular job display
            fulldetails =

                this.props.jobdetails.map(job => {
                    var al
                    var tempDate = new Date() - new Date(job.posted_date_time);
                    console.log(tempDate)
                    var day = 1000 * 60 * 60 * 24;
                    var hours = 1000 * 60 * 60
                    var hours = Math.floor(tempDate / hours)
                    var days = Math.floor(tempDate / day);
                    var months = Math.floor(days / 31);
                    console.log("hours" + hours)
                    console.log(days)
                    console.log(months)
                    var diffdate = hours > 24 ? days + " days ago" : hours + " hours ago"
                    if (months > 0) {
                        diffdate = months + " months ago"
                    }

                    //   onClick={()=>{localStorage.setItem('easyapplyid',job.job_id)}}
                    //  && this.state.applydetails=="210"
                    if (job.type_of_apply == "easyapply")

                        al = (<button className="btn btn-primary text-white ml-2 p-2" data-toggle="modal" data-target="#easyApplyModal"
                            onClick={() => this.handleHalffilled1(job.job_id, job.recruiter_email, job.company, job.title, job.location)}>
                            <i className=" fa fa-lg text-white fa-linkedin-square"></i> <strong>Easy Apply</strong></button>)

                    else

                        al = (<button className="btn btn-primary text-white ml-2 p-2 " type="submit" onClick={() => this.handleHalffilled(job.job_id, job.recruiter_email, job.company, job.title, job.location)} > <strong>Apply</strong></button>)




                    if (job.job_id == this.state.id) {
                        if (this.state.applydisplay == "200")
                            al = (<h5 className="text-danger mt-2" >Already applied</h5>)
                        return (
                            <div className="ml-2">

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



                                <div className="row smooth-scroll mt-3">
                                    <div className="col-lg-4 mt-2"> <img className="img-fluid ml-2 mr-2" src={require('../images/1.jpg')} /></div>
                                    <div className="col-lg-7 mt-2 ml-2">
                                        <button className="btn btn-link m-0 p-0 text-primary text-capitalize"><h4>{job.title}  {this.state.applydisplay}</h4>
                                        </button>
                                        <h4 className="text-capitalize ">{job.company}</h4>
                                        <div className="text-muted text-capitalize">{job.location}</div>
                                        <div className="text-muted">
                                            <small>Posted {diffdate} ago <span>-- views</span></small></div>
                                        <div className="mt-2">
                                            <button className="btn btn-primary text-white p-2 "
                                                onClick={() => this.handleSaveJob(job.job_id, job.recruiter_email, job.title)}><strong>Save</strong></button>
                                            {al}

                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-lg-4 mt-2 border-top border-bottom">
                                        <strong>Job</strong>
                                        <li>{job.no_of_applicants} Applicants</li>
                                    </div>
                                    <div className="col-lg-4 mt-2 border">
                                        <strong>Company</strong>
                                        <div className="mt-2"><small>Company page not claimed</small></div>
                                        <div><small className="text-primary "><strong><a href="#">This is my company </a></strong></small></div>
                                    </div>
                                    <div className="col-lg-4 mt-2 border-top border-bottom">
                                        <strong>Connections</strong></div>
                                </div>

                                <h6 className="mt-2">Job Description</h6>
                                <div className="ml-1"><small>{job.description}</small></div>

                                <div className="row mt-3">
                                    {/* <div className="col-lg-3 mt-2 border-top border-bottom">
                             <strong>Seniority Level</strong>
                             <div>Entry Level</div>
                             </div> */}
                                    <div className="col-lg-4 mt-2 border-top border-bottom ">
                                        <strong>Industry</strong>
                                        <div className="mt-2">{job.industry}</div>
                                    </div>
                                    <div className="col-lg-4 mt-2 border">
                                        <strong>Employement Type</strong>
                                        <div className="mt-2">{job.employment_type}</div>
                                    </div>
                                    <div className="col-lg-4 mt-2 border-top border-bottom"> <strong>Job Functions</strong>
                                        <div className="mt-2">{job.job_function}</div>
                                    </div>
                                </div>

                                <div className="ml-3 mr-3 mt-2">
                                    <q><i><small>Any unsolicited resumes/candidate profiles submitted through our website or to personal email accounts of employees of {job.company} and any subsidiaries of {job.company} are considered property of {job.company} and any subsidiaries of {job.company} and are not subject to payment of agency fees.</small></i></q>
                                </div>
                            </div>)
                    }
                })

        }


        return (
            <div>
                <div>
                    <Navbar />
                </div>

                <div className="row bg-dark p-3">
                    <div className="form-inline my-2 my-lg-0 ml-5 col-lg-5">
                        <input type="text" className="form-control mr-sm-2 fontAwesome bg-white iconColour w-100" type="search" placeholder="&#xF002; Search Jobs" aria-label="Search" name="searchjob" onChange={this.handleEvent} />

                    </div>
                    <div className="form-inline my-2 my-lg-0 col-lg-6 ml-0">
                        <input className="form-control mr-sm-2 w-75 fontAwesome iconColour bg-white " type="location" placeholder="&#xF002; Search location" aria-label="location"
                            name="searchlocation" onChange={this.handleEvent} />
                        <button className="btn btn-outline-light my-2 my-sm-0 ml-2 iconColour" type="submit" onClick={this.submitJobCriteria}>Search</button>
                    </div>
                </div>



                <nav class="navbar navbar-expand-lg navbar-light bg-white mt-2">
                    {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button> */}
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav p-3">
                            <li className="nav-item dropdown navbar-left">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" className="p-2 text-muted nav-link">
                                    <strong>Jobs</strong></a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">All</a>
                                    <a className="dropdown-item" href="#">People</a>
                                    <a className="dropdown-item" href="#">Content</a>
                                    <a className="dropdown-item" href="#">Companies</a>
                                </div>
                            </li>

                            {/* Date Posted */}
                            <li className="nav-item dropdown ml-0 navbar-left">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" className="border border-dark p-2 text-muted nav-link">
                                    <strong>Date Posted <i className="fa fa-caret-down"></i></strong></a>

                                <div className="dropdown-menu">
                                    <div>
                                        <input type="radio" name="timelapse" value="1" className="dropdown-item ml-0" onClick={this.handleEvent}></input>Past 24 </div>
                                    <input type="radio" name="timelapse" value="8" className="dropdown-item" onClick={this.handleEvent}></input>Past week
                <input type="radio" name="timelapse" value="31" className="dropdown-item" onClick={this.handleEvent}></input>Past Month
                <div className="dropdown-divider"></div>
                                    <input type="radio" name="timelapse" value="0" className="dropdown-item" onClick={this.handleEvent}></input>Any Time<br></br>
                                    <button className="btn btn-primary ml-1" type="reset" id="resettimelapse" onClick={this.submitAdvanceJobCriteria}>Cancel</button>
                                    <button className="btn btn-primary ml-1" type="submit" onClick={this.submitAdvanceJobCriteria}>Apply</button>

                                </div>

                            </li>

                            {/* LinkedIn Features */}
                            <li className="nav-item dropdown ml-0 navbar-left">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" className="border border-dark p-2 text-muted nav-link">
                                    <strong>LinkedIn Features <i className="fa fa-caret-down"></i></strong></a>
                                <div className="dropdown-menu">
                                    <div className="dropdown-item ml-3 text-muted">
                                        <input type="checkbox" onClick={this.handleEvent} id="easyapply" name="type_of_apply" value="easyapply" onClick={this.handleEvent} />
                                        <label for="easyapply" className="ml-2">Easy Apply</label>
                                    </div>
                                    <div className=" dropdown-item ml-3 text-muted">
                                        <input type="checkbox" onClick={this.handleEvent} id="under10" name="feature" value="under10" />
                                        <label for="under10" className="ml-2">Under 10 applicants</label>
                                    </div>
                                    <button className="btn btn-primary ml-5" type="reset" id="resettypeofapply" onClick={this.submitAdvanceJobCriteria}>Cancel</button>
                                    <button className="btn btn-primary ml-2" type="submit" onClick={this.submitAdvanceJobCriteria}>Apply</button>
                                </div>
                            </li>


                            {/* Company Filter */}
                            <li className="nav-item dropdown ml-0 navbar-left">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" className="border border-dark p-2 text-muted nav-link">
                                    <strong>Company <i className="fa fa-caret-down"></i></strong></a>
                                <div className="dropdown-menu w-100">
                                    <div className="dropdown-item">
                                        <input type="text" className="w-100" name="company" onChange={this.handleEvent}></input></div>

                                    <button className="btn btn-primary ml-1" type="reset" id="resetcompany" onClick={this.submitAdvanceJobCriteria}>Cancel</button>
                                    <button className="btn btn-primary ml-1" type="submit" onClick={this.submitAdvanceJobCriteria}>Apply</button>

                                </div>
                            </li>

                            {/* Experience leval */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" className="border border-dark p-2 text-muted nav-link">
                                    <strong>Experience Level <i className="fa fa-caret-down"></i></strong></a>
                                <div className="dropdown-menu w-100">
                                    <div className="dropdown-item ml-1 mr-2 text-muted">
                                        <input type="checkbox" onClick={this.handleArray} id="internship" name="feature" value="internship" />
                                        <label for="internship" className="ml-2">Internship</label>
                                    </div>

                                    <div className=" dropdown-item ml-1 mr-2 text-muted">
                                        <input type="checkbox" onClick={this.handleArray} id="entrylevel" name="feature" value="entrylevel" />
                                        <label for="entrylevel" className="ml-2">Entry Level</label>
                                    </div>
                                    <div className="dropdown-item ml-1 mr-2 text-muted">
                                        <input type="checkbox" onClick={this.handleArray} id="associate" name="feature" value="associate" />
                                        <label for="associate" className="ml-2">Associate</label>
                                    </div>
                                    <div className="dropdown-item ml-1 mr-2 text-muted">
                                        <input type="checkbox" onClick={this.handleArray} id="midseniorlevel" name="feature" value="midseniorlevel" />
                                        <label for="midseniorlevel" className="ml-2">Mid-Senior level</label>
                                    </div>
                                    <div className="dropdown-item ml-1 mr-2 text-muted">
                                        <input type="checkbox" onClick={this.handleArray} id="director" name="feature" value="director" />
                                        <label for="director" className="ml-2">Director</label>
                                    </div>
                                    <div className="dropdown-item ml-1 mr-2 text-muted">
                                        <input type="checkbox" onClick={this.handleArray} id="executive" name="feature" value="executive" />
                                        <label for="executive" className="ml-2">Executive</label>
                                    </div>
                                    <div className="dropdown-item ml-1 mr-2 text-muted">
                                        <input type="checkbox" onClick={this.handleArray} id="notapplicable" name="feature" value="notapplicable" />
                                        <label for="notapplicable" className="ml-2">Not Applicable</label>
                                    </div>
                                    <button className="btn btn-primary ml-1" type="reset" id="resetexperience" onClick={this.submitAdvanceJobCriteria}>Cancel</button>
                                    <button className="btn btn-primary ml-1" type="submit" onClick={this.submitAdvanceJobCriteria}>Apply</button>
                                </div>
                            </li>
                        </ul>
                        <div className="mx-auto">
                            <Link to='/savedJobs'><button class="btn btn-primary linkedInBtn" >SAVED JODS</button></Link>
                            <Link to='/applicantDashboard'><button class="btn btn-primary marginLeft linkedInBtn">APPLIED JOBS</button></Link>
                        </div>
                    </div>
                </nav><hr className="shadow"></hr>

                <div className="row ml-5 mr-3 mt-2 border">
                    <div className="col-lg-5 bg-light border anylistclass" > {details}</div>
                    <div className="col-lg-6 border anyClass" > {fulldetails}
                        <h4 className="mt-3 ml-3">If interested, click on particular job to view details</h4>
                    </div>
                </div>
            </div>
        );
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


const mapDispatchStateToProps = dispatch => {
    return {
        submitJobDisplay: (data) => {
            axios.post(IP_backEnd + '/searchjob', data)
                .then((response) => {
                    console.log("After search job request")
                    dispatch({ type: 'JOB_DISPLAY', payload: response.data, statusCode: response.status })
                });
        },
        submitJobSearch: (data) => {
            axios.post(IP_backEnd + '/searchjob', data)
                .then((response) => {
                    console.log("After search job request")
                    dispatch({ type: 'JOB_DISPLAY', payload: response.data, statusCode: response.status })
                });
        },
        submitAdvanceJobSearch: (data) => {
            axios.post(IP_backEnd + '/searchjob', data)
                .then((response) => {
                    console.log("After search job request")
                    dispatch({ type: 'JOB_DISPLAY', payload: response.data, statusCode: response.status })
                });
        },

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

export default connect(mapStateToProps, mapDispatchStateToProps)(JobDisplay);