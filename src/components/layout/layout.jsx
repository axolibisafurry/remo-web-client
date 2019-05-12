import React from "react";
import Login from "./login/login";
import User from "./nav/user";
import Chat from "./chat/chat";
import Signup from "./login/signup";

const Layout = ({ socket, chatroom, user, setUser, handleAuth }) => {
  return (
    <React.Fragment>
      {socket !== null ? (
        <React.Fragment>
          {!user ? (
            <Signup socket={socket} setUser={setUser} handleAuth={handleAuth} />
          ) : (
            <React.Fragment>
              <User user={user} socket={socket} />
            </React.Fragment>
          )}
          <Chat socket={socket} user={user} chatroom={chatroom} />
        </React.Fragment>
      ) : (
        <div> Connection Offline </div>
      )}
    </React.Fragment>
  );
};

export default Layout;
