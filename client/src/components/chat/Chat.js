import React, { Component } from 'react'

import openSocket from "socket.io-client";
import "./Chat.css";
import { connect } from "react-redux";

const socket = openSocket(`127.0.0.1:8000`);



 

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allMessages:{},
      message:'jkjkkj',
      users:[],
      chatRoom: this.props.currentProject || { ...this.props.user.projectList[0] || [] },
     
      
    }
  }

  updateUsers = (users) => {
    this.setState({users})
  }
  
  handleChange = (e) => {
    this.setState({message: e.target.value});
    console.log('this message=', this.state.message)
   }

  componentDidMount(){
    console.log("useeffect emit create");
   
   if(this.props.user.projectList){
    const projectTitles = this.props.user.projectList.map(prj => prj.title) ;
    socket.emit("create", projectTitles);

    this.props.user.projectList.forEach(prj => {
      socket.on(prj.title, function(msg) {
        let update = [msg];
        if (this.state.allMessages[prj.title]) {
          update = [...this.state.allMessages[prj.title], msg];
        }
        this.setState({allMessages: { ...this.state.allMessages, [prj.title]: update }});

      });
    });
   }

    if(this.props.user){
      socket.emit("login", this.props.user.username);
    }

    socket.on("users", function(userlist) {
      console.log("on user");
      this.updateUsers(userlist)
    });

  }
  
  render() {
    return (
      <div>
        <div className="chat-container">
      <div className="chat-left">
        <ul>
          {this.props.user.projectList.map(project => (
            <li
              key={project._id}
              id={project._id}
              onClick={e => {
                const project = this.props.user.projectList.find(
                  prj => prj._id === e.target.id
                );
                this.setState({chatRoom: project});
                console.log("chatRoom.title =", project.title);
              }}
            >
              {project.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="chat-middle">
        <div className="chat-title">{this.state.chatRoom && this.state.chatRoom.title}</div>
        <div className="chat-display">
          <ul>
            {this.state.chatRoom && this.state.allMessages[this.state.chatRoom.title] &&
              this.state.allMessages[this.state.chatRoom.title].map((msg, i) => (
                <li key={i}>
                  <div>
                    <span className="chat-msg-username">{msg.username}:</span>
                    <span className="chat-msg-date">
                      {new Date(msg.date).toLocaleString()}
                    </span>
                  </div>
                  <p>{msg.message}</p>
                </li>
              ))}
          </ul>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log('submit', this.state.message)
            if (!this.state.message) return;
            console.log('submit ....')
            socket.emit(this.state.chatRoom.title, { username: this.props.user.username, message: this.state.message });
            let update = [{ username: this.props.user.username, message: this.state.message }];
            if (this.state.allMessages[this.state.chatRoom.title]) {
              update = [...this.state.allMessages[this.state.chatRoom.title], { username: this.props.user.username, message: this.state.message }];
            }
            this.setState({allMessages: { ...this.state.allMessages, [this.state.chatRoom.title]: update }});
            this.setState({message: ''})
          }}
        >
          <input
            className="input-chat-message"
            type="text"
            value={this.message}
            onChange={this.handleChange}
          />
          <input className="btn-chat-send" type="submit" value="Send" />
        </form>
      </div>
      <div className="chat-right">
        <ul>
          {this.state.users && this.state.users.map((user, i) => (
            <li key={i}>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
      </div>
    )
  }
}




const mapStateToProps = state => {
  return {
    user: state.user,
    currentProject: state.project
  };
};

export default connect(mapStateToProps)(Chat);
