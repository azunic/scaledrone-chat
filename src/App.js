import React, { Component } from "react";
import Messages from "./components/Messages";
import Input from "./components/Input";
import "./App.css";
import Button from 'react-bootstrap/Button';
import {
  clearMsg,
  pushMsg,
  pushMembers,
  addMemberID,
  removeMember,
  addAvatar,
} from "./redux/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { BigHead } from "@bigheads/core";
import { getRandomOptions } from "./services/bigheads";

class App extends Component {
  constructor(props) {
    super(props);
    this.drone = new window.Scaledrone("3bOpyDqblmGo4oLz", {
     
      data: this.props.member,
    });

    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
    
      this.props.addMemberID(this.drone.clientId);
      this.props.addAvatar(<BigHead {...getRandomOptions()} />);
    });
  
    this.room = this.drone.subscribe(`observable-${this.props.room}`);
    this.room.ime = this.props.room;

    
    this.room.on("message", (message) => {
      const { data, member, timestamp } = message;

      if (member.id === this.props.member.id) {
        member.avatar = this.props.member.avatar;
      } else {
        member.avatar = <BigHead {...getRandomOptions()} />;
      }

      let vrijeme = timestamp * 1000;
      var date = new Date(timestamp * 1000);
      var hours = date.getHours();
      var minutes = "0" + date.getMinutes();
      vrijeme = `${hours} : ${minutes.substr(-2)}`;

      this.props.pushMsg({ member, text: data, timestamp: vrijeme });
    });

 
  }

  onSendMessage(message) {
    this.drone.publish({
      room: `observable-${this.props.room}`,
      message,
    });
  }

 
  handleSend(event) {
    event.preventDefault();
    this.onSendMessage(this.props.text);
    this.props.clearMsg();
  }

 

  render() {
    return (
      <div id="app">
   
    
        
      <div id="chat-area">
        <div>
          <h3 style={{textAlign:'center',fontStyle:'bold'}}>
            Algebra Chat
            <Link  to="/" style={{marginLeft:'70%',fontSize:'20px'}}>
            <Button variant="secondary">  Povratak na login</Button>
          </Link>
          </h3>
         

          <Messages />
        </div>
        <Input handleSend={(e) => this.handleSend(e)} />
       
      </div>
    </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    text: state.text,
    member: state.member,
    messages: state.messages,
    members: state.members,
  };
}

const mapDispatchToProps = {
  clearMsg,
  pushMsg,
  pushMembers,
  addMemberID,
  removeMember,

  addAvatar,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
