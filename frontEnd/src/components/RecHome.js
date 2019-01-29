import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './RecHomeNavbar';
import axios from 'axios';
import {setCurrentJob} from '../actions/jobDisplayActions';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay } from 'reactstrap';
import '../css/RecHome.css';
import Select from 'react-select';
import 'react-dropdown/style.css';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import { IP_NODE_PORT, IP_backEnd } from '../config/config.js'

const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Closed', label: 'Closed' }
];

const options1 = [
    { value: 'Newest first', label: 'Newest first' },
    { value: 'Oldest first', label: 'Oldest first' },
    { value: 'A-Z', label: 'A-Z' },
    { value: 'Z-A', label: 'Z-A' }
];


class RecHome extends Component {

    constructor(props) {
        super(props);
        this.state={
            postedJobs      :   [],
            filter1         :   '',
            filter2         :   '',
            searchCriteria  :   '',
            postedJobsBckp  :   ''
        }
    }

    componentDidMount=()=>{
        console.log("Inside componentDidMount of recruiter Home")
        console.log(window.localStorage.getItem("userEmail"));
        axios.get(IP_backEnd+"/recruiter/getPostedJobs",{
            params: {
            email : window.localStorage.getItem("userEmail")
            }
        })
        .then(response => {
            if(response.data.status === 200){
                console.log("Posted Job Details-",response.data)
                this.setState({
                    postedJobs      : response.data.result,
                    postedJobsBckp  : response.data.result
                })
            }else{
                console.log("Hey recruiter you haven't posted any job, first do that")
            }
        }).catch(err=>{
            console.log("Something went wrong while fetching the posted jobs",err);
        })
    }

    ratingChangeHandler=(selectedOption)=>{
        this.setState({ 
            filter1 : selectedOption
        });
    }

    searchChangeHandler=(e)=>{
        this.setState({ 
            searchCriteria : e.target.value
        });
    }

    detailsClickHandler = (e,jobID) => {
        e.preventDefault();
        this.props.setCurrentJob(jobID);
        this.props.history.push('/viewApplicants',jobID);
    }

    editClickHandler = (e, jobID) => {
        e.preventDefault();
        this.props.setCurrentJob(jobID);
        this.props.history.push('/postJob',{
            jobID : jobID
        });
    }

    searchFilterChangeHandler=(e)=>{
        e.preventDefault();
        this.setState({
            postedJobs  : [...this.state.postedJobsBckp]
        },()=>{
            let filPostedJobs=[...this.state.postedJobs];
            console.log("Filter criteria",this.state.searchCriteria)
            filPostedJobs=filPostedJobs.filter((job)=>{
                return job.company.includes(this.state.searchCriteria);
            })
            console.log("Jobs after filtering",filPostedJobs)
            this.setState({
                postedJobs  : [...filPostedJobs]
            })
        })
    }
    
    availabilityChangeHandler= (selectedOption) => {
        console.log("Filter 2 selected option is",selectedOption.value);
        let filPostedJobs=[];
        if(selectedOption.value==='Newest first'){
            console.log("Newest first selected");
            filPostedJobs=[...this.state.postedJobs];
            filPostedJobs.sort(function(a,b){
                var alc = a.posted_date_time, blc = b.posted_date_time;
                return alc > blc ? -1 : alc < blc ? 1 : 0;
            })
        }else if(selectedOption.value==='Oldest first'){
            console.log("Oldest first selected");
            filPostedJobs=[...this.state.postedJobs];
            filPostedJobs.sort(function(a,b){
                var alc = a.posted_date_time, blc = b.posted_date_time;
                return alc > blc ? 1 : alc < blc ? -1 : 0;
            })
        }else if(selectedOption.value==='A-Z'){
            console.log("A-Z selected");
            filPostedJobs=[...this.state.postedJobs];
            filPostedJobs.sort(function(a,b){
                var alc = a.company.toLowerCase(), blc = b.company.toLowerCase();
                return alc > blc ? 1 : alc < blc ? -1 : 0;
            })
        }else if(selectedOption.value==='Z-A'){
            console.log("Z-A selected");
            filPostedJobs=[...this.state.postedJobs];
            filPostedJobs.sort(function(a,b){
                var alc = a.company.toLowerCase(), blc = b.company.toLowerCase();
                return alc > blc ? -1 : alc < blc ? 1 : 0;
            })
        }
        this.setState({ 
            filter2     : selectedOption,
            postedJobs  : filPostedJobs
        });
    }

    render() {
        console.log("State display",this.state.postedJobs)
        const jobs=[...this.state.postedJobs];
        let jobsDisp=null;
        let footDisp=null;
        if(jobs.length==1){
            footDisp=(
            <div class="footerHack">
                <img style={{width : "100%", display: "block"}} src={require('../images/RecFooter.png')} alt="Not able to find recruiter footer"/>
            </div>)
        }else if(jobs.length>1 || jobs.length==0){
            footDisp=(
            <div class="footer">
                <img style={{width : "100%", display: "block"}} src={require('../images/RecFooter.png')} alt="Not able to find recruiter footer"/>
            </div>)
        }
        if(jobs.length==0){
            jobsDisp=(
                <div>
                    <img style={{width : "60%",  display: "block", paddingTop : "7%", paddingLeft : "3%"}} src={require('../images/NoJobs.png')} alt="Tu job post kele nayse re!"/>
                </div>
            )
        }        
        return (
            <div>
                <div>
                  <Navbar/>
                </div>
                <div>
                    <div class="split left">
                        <br/>

                        <div className="">
                            <nav className="navbar navbar-rec-fil navbar-expand-lg navbar-light">
                                <div class="row" style={{width : "65%", paddingLeft : "5%", border : "1px black solid", backgroundColor : "honeydew"}}>
                                    <form className="form-inline my-2 my-lg-0">
                                        <input onChange = {this.searchChangeHandler} className="form-control mr-sm-2 fontAwesome iconColour" type="search" placeholder="&#xF002; Search" aria-label="Search"/>
                                        <button onClick={this.searchFilterChangeHandler} className="btn btn-outline-light my-2 my-sm-0 iconColour" type="submit" style={{color : "black", border : "0.5px black solid"}}>Search</button>
                                    </form>
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div class="form-group" style={{color : "black", width : "20%", paddingTop : "12px"}}>
                                        <Select class="form-control"  value={this.state.filter1} onChange={this.ratingChangeHandler} options={options}/>
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <div class="form-group" style={{color : "black", width : "20%", paddingTop : "12px"}}>
                                        <Select class="form-control"  value={this.state.filter2} onChange={this.availabilityChangeHandler} options={options1}/>
                                    </div>
                                </div>
                            </nav>
                        </div>

                        {jobsDisp}
                        <div>
                            <br/>
                            {jobs.map(job=>(
                                <div style={{width : "50%",paddingLeft : "15%", color : "black"}}>
                                    <Card inverse>
                                        <CardImg width="100%" src={require('../images/RecJobBackground.jpg')} alt="Card image cap" />
                                        <CardImgOverlay>
                                        <CardTitle style={{color : "black"}}>{job.company}</CardTitle>
                                        <CardText style={{color : "black"}}>{job.description}</CardText>
                                        <CardText style={{color : "black"}}>
                                            <small className="text-muted">Number of Applicants: {job.no_of_applicants}<br/>
                                            &emsp;&emsp;Number of Views:&nbsp;{job.no_of_views}</small>
                                        </CardText>
                                        <button class="btn btn-primary" onClick={(e)=>this.detailsClickHandler(e,job.job_id)}>Details</button>
                                        &nbsp;&nbsp;&nbsp;
                                        <button class="btn btn-primary" onClick={(e)=>this.editClickHandler(e,job.job_id)}>Edit</button>
                                        </CardImgOverlay>
                                    </Card>
                                    <hr></hr>
                                </div>
                            ))}
                        </div>
                        {footDisp}
                    </div>
                    <div class="split right">
                        <div>
                        <img style={{width : "80%", display: "block", paddingTop : "40%"}} src={require('../images/JobHomeRightSide.png')} alt="Not able to find recruiter footer"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({applicationState}) => ({
    applicationState,
})

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setCurrentJob,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RecHome);
