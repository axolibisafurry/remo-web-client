import React, { Component } from "react";
import { USERS_UPDATED } from "../../../services/sockets/events";
import UserList from "./userList.jsx";
import Messages from "./messages";
import SendChat from "./sendChat";
import "./chat.css";
import { colors } from "../../../settings/colors.js";

export default class Chat extends Component {
  _isMounted = false;
  //This component will rely entirely on props passed into it to build the state.
  //@param socket { object } is the websocket listener passed in
  //@param users { object } gets populated when socket receives USERS event

  state = {};

  componentDidMount() {
    this._isMounted = true;
    this.chatListener();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  chatListener = async () => {
    const { socket } = this.props;
    if (socket && this._isMounted) {
      await socket.on(USERS_UPDATED, users => {
        this.colorUsers(users);
      });
    }
  };

  colorUsers = users => {
    Object.keys(users).map(mapUser => {
      if (!mapUser.color) {
        let getColor = colors[Math.floor(Math.random() * colors.length)];
        return (users[mapUser].color = getColor);
      }
      return users;
    });
    this.setState({ users });
  };

  render() {
    const { onEvent, user, socket } = this.props;

    return (
      <div>
        {this.state.users ? (
          <div className="chat-container">
            <div className="messages-container">
              <Messages
                messages={
                  this.props.chatroom ? this.props.chatroom.messages : []
                }
                users={this.state.users}
              />
              <SendChat onEvent={onEvent} user={user} socket={socket} />
            </div>
            <UserList users={this.state.users} colors={colors} />
          </div>
        ) : (
          <div>Please login!</div>
        )}
      </div>
    );
  }
}
