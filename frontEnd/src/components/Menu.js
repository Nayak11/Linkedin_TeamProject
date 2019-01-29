import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './Navbar';
import Profile from './Profile';
import connections from './connections'
import ViewAllApplicants from './ViewAllApplicants';
import ViewAllMessages from './Messages/ViewAllMessages';
import Apply from './Apply';
import EasyApply from './EasyApply';
//import PostAJob from './PostAJob';
//import RecHome from './RecHome';
import newsFeed from './newsFeed';
import CityWiseApplications from './Dashboard/CityWiseApplications';


import RecHome from './RecHome'
import Home from './Home';

import PostAJob from './PostAJob'


import ApplicantDashboard from './ApplicantDashboard';




import JobDisplay from './JobDisplay';
import RecruiterPostJob from './RecruiterPostJob';
import Dashboard from './AdminDashboard';
import LogSaveJob from './logSavedJob';
import ReactPDF from './ReactPDF';
import savedJobs from './savedJobs';
import top5Less from './Top5Less';
import getTop10 from './GetTop10';
import ApplicantGraph from './ApplicantGraph';

import ViewConversation from './Messages/ViewConversation';
class Menu extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Menu");
    }
    render() {
        return (
            <div>
                <Route path="/home" exact component={Home} />
                <Route path="/" exact component={Navbar} />
                <Route path="/jobdisplay" component={JobDisplay} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/postJob" component={RecruiterPostJob} />
                <Route path="/logSaveJob" component={LogSaveJob} />
                <Route path='/profile' component={Profile} />
                <Route path='/connections' component={connections} />
                <Route path='/viewApplicants' component={ViewAllApplicants} />
                <Route path='/messages' component={ViewAllMessages} />
                <Route path='/conversation' component={ViewConversation} />
                <Route path='/newsFeed' component={newsFeed} />
                <Route path='/recHome' component={RecHome} />
                <Route path='/postAJob' component={PostAJob} />
                <Route path='/reactPDF' component={ReactPDF} />
                <Route path='/applicantDashboard' component={ApplicantDashboard}/>
                <Route path='/apply' component={Apply} />
                <Route path='/easyApply' component={EasyApply} />
                <Route path='/savedJobs' component={savedJobs} />
                <Route path='/top5Less' exact component={top5Less} />
                <Route path='/getTop10' exact component={getTop10} />

                <Route path='/citywise' component={CityWiseApplications}/>
                <Route path ='/view' component={ApplicantGraph}/>

            </div>
        );
    }
}
export default Menu;

//<Route exact path='/postAJob' component={PostAJob} />
//<Route path='/recHome' component={RecHome} />