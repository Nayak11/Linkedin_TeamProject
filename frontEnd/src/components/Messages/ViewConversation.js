import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import {IP_backEnd} from '../../config/config';
//Redux
import {connect} from 'react-redux';

class ViewConversation extends Component {

    constructor(props){
        super(props);
        this.state = {
            Message : [],
            Reply : '',
        }
    }

    componentDidMount(){
        axios.get(IP_backEnd+"/messages/user?participant1="+this.props.location.state.participant+"&&participant2="+window.localStorage.getItem('userEmail'))
            .then(response => {
                console.log(response.data);
                if(response.data){
                    this.setState({
                        Message : this.state.Message.concat(response.data.messages),
                    }) 
                }
                else{
                    this.setState({
                        Message:[]
                    })
            }
            }).catch=(e)=>{
                this.setState({
                    Message:[]
                })
            }
    }

    replyChangeHandler = (e) => {
        this.setState({
            Reply : e.target.value
        })
    }

    sendMessage = (e) => {
        console.log(this.state.Reply);
        let data={
            participants : [window.localStorage.getItem('userEmail'), this.props.location.state.participant],
            messages : {
                from: window.localStorage.getItem('userEmail'),
                msg : this.state.Reply,
            }
        }
        axios.post(IP_backEnd+"/messages", data)
            .then(response => {
                alert("Message sent successfully");
            })
            .catch(error => {
                alert("Error sending message");
                console.log(error);
            })
    }

  render() {
    let renderMessages = this.state.Message.map(message => {
        return (
        <tr>
            <td>{message.from}</td>
            <td>{message.msg}</td>
        </tr>
        )
    })

    return (
      <div>
        {/* <Navbar/> */}
        <div class="container">
            <h3>{this.props.location.state.participant}</h3>
            <table class="table">
                <thead>
                    <th>From</th>
                    <th>Message</th>
                </thead>
                <tbody>
                    {renderMessages}
                </tbody>
            </table>
            <div class="form-inline">
                <input class="form-control" type="text" onChange={this.replyChangeHandler} placeholder="Reply"/>
                <button class="btn btn-primary" onClick={this.sendMessage}>Reply</button>
            </div> <br/><hr/>
        </div>
        <Footer/>
      </div>
    )
  }
}

const mapStateToProps = ({messagesState}) => ({
    messagesState,
})

export default connect(mapStateToProps)(ViewConversation);
