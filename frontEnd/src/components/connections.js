import React, { Component } from 'react';
import '../css/connections.css';
import '../css/Profile.css';
import { IP_backEnd } from '../config/config';
import axios from 'axios';
import Navbar from './Navbar';

class connections extends Component {
    constructor() {
        super();
        this.state = {
            acceptedConnections: [],
            pendingConnections: [],
            acceptedCProfiles: [],
            pendingCProfiles: []
        }
        this.acceptConnection = this.acceptConnection.bind(this);
    }
    async componentDidMount() {
        //${localStorage.getItem('email')}
        let acceptedConnections = []
        let pendingConnections = []
        let data = {
            email: localStorage.getItem('userEmail')
        }
        let acceptedCProfiles = []
        let pendingCProfiles = []
        await axios.post(IP_backEnd + `/getConnections`, data)
            .then(async (response) => {
                console.log("Inside Connections: ")
                console.log("Status Code: ", response.data);
                if (response.status === 200) {
                    for (var i = 0; i < response.data.length; i++) {
                        //console.log(response.data[i])
                        if (response.data[i].status == 1) {
                            acceptedConnections.push(response.data[i])
                            console.log("Accepted:" + response.data[i])
                            let data = {
                                email: response.data[i].to
                            }
                            await axios.get(IP_backEnd + `/userProfile?email=${response.data[i].from}`)
                                .then((response) => {
                                    console.log("Inside user Profiles: ")
                                    console.log("Status Code: ", response.data);
                                    if (response.status == 200) {
                                        acceptedCProfiles.push(response.data[0])
                                        console.log("acceptedCProfiles value: " + acceptedCProfiles)
                                    } else {
                                        console.log("not done")
                                    }
                                    //console.log("Inside complex:"+acceptedCProfiles.address)
                                }).catch(err => {
                                    console.log(err);
                                });
                        }
                        else if (response.data[i].status == 0) {
                            pendingConnections.push(response.data[i])
                            await axios.get(IP_backEnd + `/userProfile?email=${response.data[i].from}`)
                                .then((response) => {
                                    console.log("Inside user Profiles: ")
                                    console.log("Status Code: ", response.data);
                                    if (response.status == 200) {
                                        pendingCProfiles.push(response.data[0])
                                        console.log("pendingCProfiles value: " + pendingCProfiles)
                                    } else {
                                        console.log("not done")
                                    }
                                }).catch(err => {
                                    console.log(err);
                                });
                        }
                    }

                    console.log(acceptedConnections)
                    console.log("Pending Connections: ")
                    console.log(pendingConnections)
                    console.log(pendingCProfiles)
                    console.log("acceptedCProfiles value: " + acceptedCProfiles)
                    // setTimeout(() => {
                    // }, 1000);
                        this.setState({
                            // ...response.data,
                            // acceptedConnections,
                            // pendingConnections
                            acceptedCProfiles,
                            pendingCProfiles
                        })
                    

                } else {
                    console.log("Did not find the server api")
                }
                console.log(this.state)
            }).catch(err => {
                console.log(err);
            });
    }

    async acceptConnection(email, event) {
        console.log(email)
        var data={
            from:localStorage.getItem('userEmail'),
            to:email,
            status:1
        }
        await axios.put(IP_backEnd + `/acceptConnection`,data)
            .then((response) => {
                console.log("Inside Accepting Connection: ")
                console.log("Status Code: ", response.data);
                if (response.status == 200) {
                    console.log("Accepted the connection")
                } else {
                    console.log("Not done")
                }
            }).catch(err => {
                console.log(err);
            });
            window.location.reload();
        return;
    }
    async declineConnection(email, event) {
        console.log(email)
        var data={
            from:email,
            to:localStorage.getItem('userEmail'),
            status:2
        }
        await axios.put(IP_backEnd + `/declineConnection`,data)
            .then((response) => {
                console.log("Inside Declining Connection: ")
                console.log("Status Code: ", response.data);
                if (response.status == 200) {
                    console.log("Declined the connection")
                } else {
                    console.log("not done")
                }
            }).catch(err => {
                console.log(err);
            });
            window.location.reload();
        return;
    }
    render() {
        //iterate over acceptedConnections to create a table row
        let details = this.state.acceptedCProfiles.map(connection => {
            return (

                <div className="column insideCard paddingLeft">
                    <hr></hr>
                    <a onClick={()=>{this.props.history.push('/profile',connection.email)}}><h5>{connection.email}</h5></a>
                    <p>{connection.address}</p>
                </div>

            )
        })
        let details1 = this.state.pendingCProfiles.map(connection => {
            return (

                <div className="column insideCard paddingLeft">
                    <hr></hr>
                    <div className="row">
                    <a onClick={()=>{this.props.history.push('/profile',connection.email)}}><h5>{connection.email}</h5></a>
                        <div className="row float-right">
                            <input className="ml-5 btn btn-success" type="button" onClick={() => this.acceptConnection(connection.email)} value="Accept"></input>
                            <input className="ml-2 btn btn-danger" type="button" onClick={() => this.declineConnection(connection.email)} value="Decline"></input>
                        </div>
                    </div>
                    <p>{connection.address}</p>

                </div>

            )
        })
        //console.log(details)
        return (
            <div>
                <Navbar/>
                <div className="free-space"></div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="col-md-12 profileCard shadow-lg ml-3">
                            <div className="pt-4 pl-3">
                                <h5>{this.state.pendingCProfiles.length} Pending Connections</h5>
                            </div>
                            {details1}
                        </div>
                        <div className="col-md-12 profileCard shadow-lg ml-3">
                            <div className="pt-4 pl-3">
                                <h5>{this.state.acceptedCProfiles.length} Connections</h5>
                            </div>
                            {details}
                        </div>
                    </div>
                    <div className="col-md-4 mt-5 pl-5"><img src={require('../images/connectionsPage_1.JPG')}></img></div>
                </div>
            </div>
        );
    }
}

export default connections;