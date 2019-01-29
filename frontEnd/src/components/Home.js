
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import { connect } from "react-redux";
import '../css/Home.css';
import { IP_backEnd, IP_NODE_PORT } from '../config/config';
import { submitLogin } from '../actions/loginActions';
import Loading from './Loading';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            message: "success",
            flag: 0,
            isLoading: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 2000)
    }

    handleChange(e) {
        console.log(" Signup Value getting changed");
        this.setState({
            //square brackets must
            [e.target.name]: e.target.value
        })
    }

    pushCodeToMongoDB = () => {
        // //*********************      PUSH USER TO MONGO  START      **************************** */
        const data = {
            email: this.state.email,
            personalProfile: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                headLine: "headline comes here",
                city: "SAN JOSE",
                country: "ujbekistaaaaan",
                zipcode: "",
                contactInfo: "contactInfo",
                summary: "summary comes here",
            },
            experience: {
                designation: "Please Enter your experience details",
                company: "",
                empStart: "",
                empEnd: "",
                empCity: "",
                empCountry: ""
            },
            education: {
                college: "Please Enter your education details",
                major: "",
                eduStart: "",
                eduEnd: ""
            },
            skills: "",
            generateSkillFlag: true,
            isLoading: true,
            profilePic: "",
            resume: '',
            tempResume: '',
            isNewResumeUploading: false,
            isConnected: 2,
            check: true,
            displayView: 0
        }
        axios.put(IP_backEnd + '/applicant/updateProfile', data)
            .then(response => {
                console.log(response);
            });
    }

    handleClick(e) {
        console.log("I am here inside form submit")
        e.preventDefault();
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(this.state);
        const data = this.state;
        var ackmessage;
        axios.defaults.withCredentials = true;
        if (this.state.firstName == "") {
            ackmessage = "Enter your first name:"
            this.setState({ flag: 1 })
        } else if (this.state.lastName == "") {
            ackmessage = "Enter your last name:"
            this.setState({ flag: 1 })
        } else if (this.state.email == "") {
            ackmessage = "Enter your email:"
            this.setState({ flag: 1 })
        } else if (this.state.password == "") {
            ackmessage = "Enter your password:"
            this.setState({ flag: 1 })
        } else if (this.state.password.length < 6) {
            ackmessage = "Password must be 6 characters or more:"
            this.setState({ flag: 1 })
        } else if (!re.test(this.state.email)) {
            ackmessage = "Email not in correct format"
            this.setState({ flag: 1 })
        }
        else {
            this.setState({ flag: 0 })

            this.pushCodeToMongoDB(); 

            axios.post(IP_backEnd + '/signup', data)
                .then(response => {
                    if (response.status === 200) {
                        alert("sign up successfull !");
                        ackmessage = "success"
                        this.setState({ flag: 0 })
                        console.log("sign up successful, data inserted");
                        // this.props.history.push('/Login');
                    }
                })
                .catch((error) => {
                    alert("Email already exists");
                    // console.log("Response status : ", error.response.status, "Response : ", error.response.data);
                })

        }
        this.setState({ message: ackmessage })
    }

    handleLogin = (e) => {
        e.preventDefault();
        console.log("Hello I am here")
        let { email, password } = this.state;
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            const data = {
                email: email,
                password: password
            }
            console.log(data)
            if (this.state.email == "" || this.state.password == "")
                alert("Fill all the information for Login");
            else {
                this.props.submitLogin(email, password)
            }
            // if(this.props.response === 400) alert(this.props.errormessage)
            setTimeout(() => {
                if (this.props.response === 400) {
                    alert(this.props.errormessage);
                }
                else if (this.props.response === 200) {
                    //localStorage.setItem('userEmail',email);
                    this.props.history.push('/profile', email);
                }
            }, 1000);
        } else { alert("Wrong email format") }
        this.renderRedirect();
    }

    renderRedirect = () => {
        if (this.props.redirectVar) {
            console.log("redirecting... email is ", this.state.email)
            sessionStorage.setItem('username', this.state.email);
            return <Redirect to='/' />
        }
    }

    render() {
        console.log("On unsuccessfull login message:" + this.props.errormessage)
        console.log("Token is:" + window.localStorage.getItem('token'))
        console.log(this.state.message)
        const { message } = this.state
        if (this.state.message != "success" && this.state.flag == 1) {
            console.log(this.state.message)
            var al = (<div>
                {window.scrollTo(0, 0)}
                <div className="alert text-white alert-dismissible alertcolor">
                    <button type="button" className="close" data-dismiss="alert">&times;</button>
                    <h6> <i className="fa fa-thumbs-o-down mr-1"></i>
                        {this.state.message}</h6>
                </div>
            </div>
            )
        }

        //  if(this.props.response === 400 && this.props.errormessage!="") alert(this.props.errormessage)

        if (this.state.isLoading) {
            return (
                <div>
                    <Loading />
                </div>
            )
        } else {
            return (
                <div>

                    <nav className="navbar navbar-light bg-faded" >
                        <div className="row w-100">
                            <div className="col-lg-2">
                                <NavLink to="/" className="mb-0 py-0" ><img src={require('../images/logo.JPG')} /></NavLink>
                            </div>
                            <div className="col-lg-3 w-100"></div>
                            <div className="col-lg-2 ml-2 ">
                                <input type="text" placeholder="Email" name="email" className="text-muted  mr-2 p-1 w-100" onChange={this.handleChange}></input></div>



                            <div className="col-lg-2 ">
                                <input type="password" placeholder="Password" name="password" className="text-muted ml-2 p-1 w-100" onChange={this.handleChange}></input>
                            </div>

                            <div className="col-lg-2">
                                <button className="ml-1 p-1 pl-3 pr-3 mr-0 btn-link text-white" type="submit" onClick={this.handleLogin.bind(this)}>Sign in</button></div>

                            {/* <div className="mr-5 ml-2"><small className="text-white">Forget Password?</small></div> */}

                            {/* <div className="mr-5"></div> */}
                        </div>
                    </nav>

                    {/* <nav className="#212529"></nav> */}
                    <div className="ma">
                        <img className="img-fluid  im" src={require('../images/1.jpg')} />

                        <div className="container-fluid mt-3 bg-light topl col-lg-4 col-lg-offset-3 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12 border border-secondary shadow-lg rounded ">

                            <div className="row-entry">
                                <div className="text-center mb-3 " >
                                    <h4 className="title mt-2">Be great at what you do</h4>
                                    Get started - it's free.
                    <hr></hr>
                                </div>
                                {al}
                                <div class="panel-heading ml-1 mr-1 ">
                                    <div >
                                        <form onSubmit={this.submitEvent}>
                                            <div className="mt-3">
                                                <label for="firstName">First Name</label>
                                                <div><input type="text" id="firstName" name="firstName" className="panel-input w-100" onChange={this.handleChange} required /></div>
                                            </div>
                                            <div className="mt-3">
                                                <label for="lastName">Last Name</label><br></br>
                                                <input type="text" id="lastName" name="lastName" className="panel-input w-100" onChange={this.handleChange} required />
                                            </div>
                                            <div className="mt-3">
                                                <label for="email">Email</label>
                                                <div><input type="email" id="email" name="email" className="panel-input w-100" onChange={this.handleChange} required /></div>
                                            </div>

                                            <div className="mt-3">
                                                <label for="password">Password(6 or more characters)</label><br></br>
                                                <input type="password" id="password" name="password" className="panel-input w-100" onChange={this.handleChange} required />
                                            </div>
                                            <div class="text-center mt-2 text-muted" >
                                                <small>  By clicking Join now, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.</small>
                                            </div>

                                            <button type="submit" className="btn mt-2 mb-3 w-100 text-white btn-primary" onClick={this.handleClick}><strong>Join now</strong></button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>);
        }

    }
}

const mapStateToProps = (state) => ({
    redirectVar: state.loginState.redirectVar,
    response: state.loginState.response,
    errormessage: state.loginState.errormessage
})

export default connect(mapStateToProps, { submitLogin })(Home);
