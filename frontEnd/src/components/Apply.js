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
import PDF from 'react-pdf-js';


class Apply extends Component {
    constructor(props) {
        super(props);

        this.state = {
                jobID:localStorage.getItem('jobapplyid'),
                resume: "",
                email: localStorage.getItem('applyrecruiteremail'),
                cover: "",
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                hear: "",
                sponsorship: "",
                disability: "",
                resume: '',
                tempResume:'',
                isNewResumeUploading: false,     
        }
        this.handleJobApplicationChange=this.handleJobApplicationChange.bind(this);
        this.submitJobApplication=this.submitJobApplication.bind(this);

    }

    componentDidMount(){
            this.setState({jobID:this.props.applyid})
    }

    onResumeClose=()=>{
        this.setState({
            resume:""
        })
    }

    submitResume = async () => {
        if(this.state.email){
            console.log("in Submit Resume");
            this.setState({ resume: '' });
            let formData = new FormData();
            formData.append('email', this.state.email);
            formData.append('resume', this.state.tempResume);
            console.log("resume file :: before uploading ::", this.state.tempResume);
            await axios.post(IP_backEnd + '/applicant/updateProfile/resumeUpload', formData)
                .then((response) => {
                    console.log(response.data);
                });
        }
        else{
            alert("No email!!");
        }
        
        //this.getResume();
        console.log("after uploading Resume");
        //setTimeout(() => this.getResume(), 1500);
        //this.setState({ isNewResumeUploading: false });

    }

    handleResumeChange = (e) => {
        //this.setState({isNewResumeUploading: true})
        if (e.target.name == 'resume') {
            this.setState({
                tempResume: e.target.files[0]
            })
        }
    }

    handleJobApplicationChange = (event) => {
        console.log("Inside Job Application change", event.target.name);
        this.setState({
            
                [event.target.name]: event.target.value
            
        })
    }

    submitJobApplication = (e) => {
        console.log("Inside Job Application submit", this.state);
        e.preventDefault();
        console.log(this.state);
        // const data = this.state;
        const data={
            email:window.localStorage.getItem('userEmail'),
            jobID:localStorage.getItem('jobapplyid'),
                //cover: " bnvc",
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                city: this.state.city,
                hear: this.state.hear,
                sponsorship: this.state.sponsorship,
                disability: this.state.disability,
                tempResume:this.state.tempResume,
                month:"December"
            //pull all the field details this.state....
        }
    var ackmessage;
    axios.defaults.withCredentials = true;
    if(this.state.email=="" || this.state.firstName=="" || this.state.lastName==""){
        alert("One or more required fields are empty. PLease fill the information.")
    }
    else{
        axios.post(IP_backEnd + '/jobApplication/apply', data)
        .then(response => {
            if (response.status === 200) {
                alert("Applied to the position successfully !");
                ackmessage="sucess"
                
                console.log("Job Application successful, data inserted");
                // this.props.history.push('/Login');
            }
        })

    }
    this.setState({message:ackmessage})

    const data1={
        clicks:0,
        job_id:localStorage.getItem('jobapplyid'),
        recruiter_email:localStorage.getItem('applyrecruiteremail'),
        city:localStorage.getItem('userCity'),
        // city:window.localStorage.getItem('city'),
        half_filled:0,
        full_filled:1
    }
     this.props.logData(data1)
     console.log("Inside handleNew")
    
    }

    renderRedirect = () => {
        if (this.props.redirectVar) {
            console.log("redirecting... email is ",this.state.email)
            sessionStorage.setItem('username', this.state.email);
            return <Redirect to='/apply' />
        }
    }

    render(){
       
        return(
            <div className="section page-centered">
          <div className="profilePageBody">
            <div class="panel-heading ml-1 mr-1 ">

            {/* try to add the logo and name of the company */}

            <h3>{localStorage.getItem('applytitle')}</h3>
            <br></br>
            <h4>{localStorage.getItem('applycompany')}</h4>
            {/* <h5>{localStorage.getItem('applylocation')}</h5> */}
            <br></br>
                <div >
                    <form onSubmit={this.submitEvent}>
                    <h4>SUBMIT YOUR APPLICATION</h4><br></br>

                        <div className="dropdown borderMe">
                            <label for="resume">Add Resume*</label>
                            <div class="row marginTop marginBottom">
                                            <div class="col-md-8 marginTop">
                                                <input type="file" id="" className="form-control" name="resume" onChange={this.handleResumeChange} />
                                            </div>
                                            <div className="mr-auto marginTop ">
                                                <button className="btn btn-primary linkedInBtn" onClick={this.submitResume}>Attach Resume/CV</button>
                                            </div>
                            </div>
                            
                        </div><br></br>
                        <div className="dropdown borderMe">
                            <label for="resume">Cover Letter (Optional)</label>
                            <div class="row marginTop marginBottom">
                                            <div class="col-md-8 marginTop">
                                                <input type="file" id="" className="form-control" name="coverLetter" />
                                            </div>
                                            <div className="mr-auto marginTop ">
                                                <button className="btn btn-primary linkedInBtn">Attach Cover Letter</button>
                                            </div>
                            </div>       
                        </div>
                        <div className="mt-3">
                            <label for="email">Email</label>
                                <div>
                                    <input type="email" id="email" name="email" className="panel-input w-100"  required/>
                                </div>
                        </div>
                        <div className="mt-3">
                            <label for="firstName">First Name</label>
                            <div>
                                <input type="text" id="firstName" name="firstName" className="panel-input w-100" onChange={this.handleJobApplicationChange} required/>
                            </div>
                        </div>
                    <div className="mt-3">
                        <label for="lastName">Last Name</label><br></br>
                        <input type="text" id="lastName" name="lastName" className="panel-input w-100" onChange={this.handleJobApplicationChange} required/>
                    </div>
                   
                    <div className="mt-3">
                        <label for="address">Address</label><br></br>
                        <textarea rows="3" type="text" id="address" name="address" className="panel-input w-100" onChange={this.handleJobApplicationChange} required/>
                    </div>

                    <div className="mt-3">
                            <label for="city">City</label><br></br>
                            <input type="text" id="city" name="city" className="panel-input w-100" onChange={this.handleJobApplicationChange} required/>
                    </div>
                    
                    <div className="mt-3">
                        <label for="phone">Phone</label><br></br>
                        <input type="text" id="phone" name="phone" className="panel-input w-100" /*onChange={this.handleJobApplicationChange} *//>
                    </div>

                    <div className="mt-3">
                        <label for="currentCompany">Current Company</label><br></br>
                        <input type="text" id="currentCompany" name="currentCompany" className="panel-input w-100" /*onChange={this.handleJobApplicationChange} *//>
                    </div>

                    <br></br><br></br>

                    <h4>LINKS</h4>

                    <br></br>

                    <div className="mt-3">
                        <label for="linkedInURL">LinkedIn URL</label><br></br>
                        <input type="text" id="linkedInURL" name="linkedInURL" className="panel-input w-100" /*onChange={this.handleJobApplicationChange} *//>
                    </div>

                    <div className="mt-3">
                        <label for="githubURL">Github URL</label><br></br>
                        <input type="text" id="githubURL" name="githubURL" className="panel-input w-100" /*onChange={this.handleJobApplicationChange} *//>
                    </div>

                    <div className="mt-3">
                        <label for="twitterURL">Twitter URL</label><br></br>
                        <input type="text" id="twitterURL" name="twitterURL" className="panel-input w-100" /*onChange={this.handleJobApplicationChange} *//>
                    </div>

                    <div className="mt-3">
                        <label for="portfolioURL">Portfolio URL</label><br></br>
                        <input type="text" id="portfolioURL" name="portfolioURL" className="panel-input w-100" /*onChange={this.handleJobApplicationChange} *//>
                    </div>

                    <br></br>

                    <div className="dropdown borderMe">
                        <label for="hear">How did you hear about us?</label>
                        <div>
                            <select id="hear" name="hear">
                                <option value="">Select ...</option>
                                <option>Career Website</option>
                                <option>Career Center</option>
                                <option>Social Media</option>
                                <option>Newsletter</option>
                                <option>Web Search</option>
                                <option>Relatives</option>
                                <option>Collegues</option>
                                <option>Friends</option>
                            </select>
                        </div>
                    </div>
                    
                    <br></br>

                    <div className="dropdown borderMe">
                        <label for="workAuthorization">Are you legally eligible to work in the U.S.?</label>
                        <div>
                            <div>
                                <input type="radio" id="workAuthorization" name="workAuthorization" /* onChange={this.handleJobApplicationChange} */ value="Yes" />
                                <label for="workAuthorization">Yes</label>
                            </div>

                            <div>
                                <input type="radio" id="workAuthorization" name="workAuthorization" /* onChange={this.handleJobApplicationChange} */ value="No" />     
                                <label for="workAuthorization">No</label>
                            </div>
                        </div>
                    </div>

                    <br></br>
                    
                    <div className="dropdown borderMe">
                        <label for="sponsorship">Do you need, or will you need in the future, any immigration-related support or sponsorship in order to begin or continue employment with the organization in the U.S.?</label>
                        <div>
                            <input type="radio" id="sponsorship" name="sponsorship" onChange={this.handleJobApplicationChange} value="Yes" required/>
                            <label for="sponsorship">Yes</label>
                        </div>

                        <div>
                            <input type="radio" id="sponsorship" name="sponsorship" onChange={this.handleJobApplicationChange} value="No" required/>     
                            <label for="sponsorship">No</label>
                        </div>
                    </div>

                    <div className="mt-3">
                        <label for="immigrationStatus">If you answered yes to Question above, and you are currently located in the U.S. please indicate your current U.S. immigration status /visa and type of sponsorship required (if known): </label><br></br>
                        <input type="text" id="immigrationStatus" name="immigrationStatus" className="panel-input w-100" /*onChange={this.handleJobApplicationChange} *//>
                    </div>
                    
                    
                    <div className="mt-3">
                        <label for="militaryRecord">Military Record (if applicable) - Please include Branch of Service, dates served, and nature of discharge: </label><br></br>
                        <textarea rows="2" type="text" id="militaryRecord" name="militaryRecord" className="panel-input w-100"  /*onChange={this.handleJobApplicationChange} */ />
                    </div>

                    <h6 id="credit">Information provided in support of this application, including but not limited to my resume or curriculum vitae and the above information, is true and correct.  I understand that false statements or material omissions of any kind during the hiring process may result in denial of employment or discharge.</h6>
                    <div className="mt-3">
                        <input type="checkbox" id="confirmation" name="confirmation" className="panel-input w-100"  /*onChange={this.handleJobApplicationChange} */ />
                        <label for="confirmation">By checking this box, I confirm my understanding</label> <br></br>
                    </div>
                    <br></br>


                    <h6 id="credit">I hereby authorize Amazon to verify and investigate my employment history and to inquire of my current and former employers and references information concerning my work history, character and ability, as Amazon deems necessary. I hereby release Amazon and its representatives in seeking such information and all other persons, corporations or organizations for furnishing such information.  In this regard, I agree to sign as a condition of my employment any and all releases not specified here, but which may be required under law, to implement this background check. I further agree to hold harmless and indemnify Amazon and its employees and agents from and against any and all liability arising out of such background investigations.
                    </h6>
                    <div className="mt-3">
                        <input type="checkbox" id="confirmation" name="confirmation" className="panel-input w-100"  /*onChange={this.handleJobApplicationChange} */ />
                        <label for="confirmation">By checking this box, I confirm my understanding</label> <br></br>
                    </div>
                    <br></br>

                    <div className="dropdown borderMe">
                        <label for="gender">Gender</label>
                        <div>
                            <select id="gender" name="gender">
                                <option value="">Select ...</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Decline to self-identify</option>
                            </select>
                        </div>
                    </div>
                    <br></br>

                    {/* race */}

                    <div className="dropdown borderMe">
                        <label for="disability">Disability Status</label>
                        <div>
                            <select id="disability" name="disability">
                                <option value="">Select ...</option>
                                <option>Yes, I have a disability (or previously had a disability)</option>
                                <option>No, I don't have a disability</option>
                                <option>Decline to self-identify</option>
                            </select>
                        </div>
                    </div>




                {/*
                    <div className="mt-3">
                            <label for="address">.....</label><br></br>
                            <input type="text" id="address" name="address" className="panel-input w-100" onChange={this.handleJobApplicationChange} required/>
                    </div>

                    <div className="mt-3">
                            <label for="address">.....</label><br></br>
                            <input type="text" id="address" name="address" className="panel-input w-100" onChange={this.handleJobApplicationChange} required/>
                    </div>
                    <div class="text-center mt-2 text-muted" >
                    <small>  By clicking Join now, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</small> 
                </div> */}
                    
                
                    <button type="submit" className="btn mt-2 mb-3 w-100 text-white btn-primary" onClick={this.submitJobApplication}><strong>Submit Application</strong></button> 
                    </form>
                </div>  
        </div>
        </div>
        </div>
        





        /*
        <div class="section page-centered application-form">
        <h4>Submit your application</h4>
        <ul>
        <li class="application-question resume">
        <label>
        <div class="application-label">Resume/CV </div>
        <div class="application-field">
        <a href="#" class="postings-btn template-btn-utility visible-resume-upload">
        <svg class="icon icon-paperclip" x="0px" y="0px" width="16px" height="16" viewBox="0 0 16 16" enable-background="new 0 0 16 16" >
        <path fill="#3F484B" d="M3.036,14.696c-0.614,0-1.219-0.284-1.788-0.853l-0.083-0.082c-0.586-0.578-2.305-2.956,0.008-5.391 c1.165-1.226,2.771-2.813,4.471-4.493C6.558,2.976,7.509,2.036,8.455,1.09c1.708-1.707,2.958-1.317,4.894,0.528 c2.288,2.178,2.707,4.322,1.718,5.463c-1.314,1.515-6.285,6.488-6.496,6.699c-0.278,0.279-0.729,0.279-1.008,0 c-0.278-0.278-0.278-0.729,0-1.008c0.051-0.051,5.146-5.148,6.427-6.625c0.294-0.339,0.339-1.629-1.624-3.498 c-1.13-1.076-1.465-1.989-2.902-0.551c-0.948,0.948-1.901,1.89-2.817,2.793C4.954,6.564,3.355,8.144,2.207,9.353 c-1.349,1.421-0.656,2.788-0.041,3.395l0.089,0.088c0.524,0.523,0.952,0.665,1.718-0.102c0.213-0.213,0.656-0.644,1.213-1.185 C6.729,10.05,9.6,7.26,10.18,6.534c0.184-0.23,0.452-0.787,0.196-1.011c-0.353-0.31-1.002,0.315-1.192,0.514 c-2.012,2.112-4.64,4.643-4.666,4.667c-0.283,0.273-0.734,0.265-1.007-0.02c-0.273-0.284-0.265-0.734,0.019-1.007 c0.026-0.025,2.633-2.535,4.622-4.624c1.291-1.356,2.48-1.201,3.162-0.604c0.832,0.727,0.636,2.154-0.021,2.974 c-0.586,0.734-2.847,2.945-5.113,5.146c-0.55,0.536-0.988,0.96-1.199,1.171C4.346,14.378,3.686,14.696,3.036,14.696L3.036,14.696z">
        </path>
        </svg>
        <span class="filename">
        </span>
        <span class="default-label">ATTACH RESUME/CV</span>
        <input class="application-file-input" type="file" name="resume" id="resume-upload-input" tabindex="-1">
        
        <span class="resume-upload-failure">
        <div class="resume-upload-label">Couldn't auto-read resume.</div>
        </span>
        <span class="resume-upload-working">
        <div class="loading-indicator"></div>
        <div class="resume-upload-label">Analyzing resume...</div>
        </span>
        <span class="resume-upload-success">
        <div class="loading-indicator completed">
        <svg class="icon icon-checkmark" width="16px" height="14px" enable-background="new 0 0 16 14" viewBox="0 0 16 14">
        <path d="M5.608,14.94L0.754,9.465c-0.5-0.562-0.393-1.383,0.242-1.828C1.63,7.192,2.55,7.288,3.05,7.852 l2.461,2.777l7.401-9.033c0.476-0.58,1.392-0.711,2.045-0.286c0.653,0.424,0.796,1.238,0.32,1.82L5.608,14.94L5.608,14.94z">
        </path>
        </svg>
        </div>
        <div class="resume-upload-label">Success!</div>
        </span>
        </div>
        </label>
        <span class="resume-upload-oversize">
        <p class="error-message">File exceeds the maximum upload size of <b>100MB</b>. Please try a smaller size.</p>
        </span>
        </li>
        <li class="application-question"><label><div class="application-label">Full name<span class="required">✱</span>
        </div>
        <div class="application-field">
        <input type="text" name="name" required="">
        </div>
        
        </label>
        </li>
        <li class="application-question">
        <label>
        <div class="application-label">Email<span class="required">✱</span>
        </div>
        <div class="application-field">
        <input name="email" type="email" pattern="[a-zA-Z0-9.#$%&amp;'*+\/=?^_`{|}~][a-zA-Z0-9.!#$%&amp;'*+\/=?^_`{|}~-]*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*" required="">
        </div>
        </label>
        </li>
        <li class="application-question">
        <label>
        <div class="application-label">Phone </div>
        <div class="application-field"><input type="text" name="phone"></div>
        </label>
        </li>
        <li class="application-question">
        <label>
        <div class="application-label">Current company </div>
        <div class="application-field"><input type="text" name="org"></div>
        </label>
        </li>
        </ul>
        </div>

        */



        );
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchStateToProps = dispatch => {
    return {
    logData:(data1) => {
        axios.put(IP_backEnd+'/recruiter/logData', data1)
        .then((response) => {
            dispatch({type: 'FULLDETAILS',payload : response.data,statusCode : response.status})
    });
    }
}
}


export default connect(mapStateToProps, mapDispatchStateToProps)(Apply);





