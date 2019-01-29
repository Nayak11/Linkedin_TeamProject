import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './RecHomeNavbar';
import axios from 'axios';
import {IP_backEnd} from '../config/config';

class PostAJob extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Menu");

        this.state = { 
            email       : '', 
            password    : '',
            authError   : ''
        }
    }

    emailChangeHandler=(e)=>{
        this.setState({
            email : e.target.value
        })
    }

    passwordChangeHandler=(e)=>{
        this.setState({
            password : e.target.value
        })
    }

    authRecruiter=()=>{
        console.log("Inside Authenticate Recruiter",this.state.email,this.state.password)
        axios.get(IP_backEnd+"/authRecruiter",{
                params: {
                    // email       : this.state.email,
                    email       : window.localStorage.getItem('userEmail'),
                    password    : this.state.password
                }
            })
            .then(response => {
                console.log("The response received after recruiter authentication before posting the job",response.data)
                if(response.data.status === 200){
                    console.log("Recruiter successfully authenticated.")
                    this.props.history.push('/postJob');
                }else if(response.data.status === 401){
                    this.setState({
                        authError   :   response.data.message
                    })
                }
            }).catch(res=>{
                console.log("Inside catch block of bookingEventHandler",res);
            })
    }

    render() {
        return (
            <div>
                <Navbar/>
                <img style={{width: "100%" , display: "block"}} src={require('../images/RecLine.png')} alt="Kaye naye display karle!"/>
                <div>
                    <div style={{backgroundColor : "#2774AE", width : "100%", paddingTop : "7%"}}>
                        <div style={{color : "white", paddingBottom : "13%", paddingLeft : "22%"}}>
                            <h2 >Reach the quality candidates you can’t find anywhere else</h2>
                            <div style={{paddingLeft : "22%", paddingTop : "7%"}}>
                                <button style={{color : "#2774AE", paddingBottom : "4%", paddingLeft : "4%", paddingRight : "4%", paddingTop : "4%"}} 
                                data-target="#authenticateModal" data-toggle="modal"> <h2>Start job post</h2></button>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" tabindex="-1" id="authenticateModal"
                        data-keyboard="false" data-backdrop="static">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Kindly aunthenticate !!!</h4>
                                    <button type="button" class="close" data-dismiss="modal">
                                        &times;
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div style={{color : "red"}}>{this.state.authError}</div>
                                        <div class="form-group">
                                            <label for="inputUserName">Email/Username</label>
                                            {/* <input class="form-control" placeholder="Login Email/Username"
                                                    type="text" id="inputUserName" onChange = {this.emailChangeHandler}/> */}
                                            <input class="form-control" placeholder="Login Email/Username"
                                                    type="text" id="inputUserName" value={window.localStorage.getItem('userEmail')}/>
                                        </div>
                                        <div class="form-group">
                                            <label for="inputPassword">Password</label>
                                            <input class="form-control" placeholder="Login Password"
                                                    type="password" id="inputPassword" onChange = {this.passwordChangeHandler}/>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" class="btn btn-primary" data-dismiss="modal" onClick={this.authRecruiter}>Authenticate</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <img style={{width: "100%" , display: "block"}} src={require('../images/Rec_PostJob1.png')} alt="Kaye naye display karle!"/>
                    <img style={{width: "100%" , display: "block"}} src={require('../images/Rec_PostJob2.png')} alt="Kaye naye display karle!"/>
                    <img style={{width: "100%" , display: "block"}} src={require('../images/Rec_PostJob3.png')} alt="Kaye naye display karle!"/>
                </div>
            </div>
        );
    }
}
export default PostAJob;
