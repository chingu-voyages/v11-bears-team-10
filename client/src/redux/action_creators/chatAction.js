import openSocket from "socket.io-client";
import axios from "axios";

const socket = openSocket(process.env.REACT_APP_BACKEND_API_CHAT_URL);

export default function configureSocketIo() {
  return (dispatch, getstate) => {
    const { projectList } = getstate().user;
    socket.on("users", function(userList) {
      dispatch({ type: "SET_CHAT_USERS", userList });
    });

    socket.on('isTyping', function(username){
      dispatch({ type: "IS_TYPING", isTyping: username})
      console.log("is typing =", username)
    })

    projectList.forEach(prj => {
      socket.on(prj._id, function(msg) {
        const messages = getstate().chat.messages || {};
        const newMessagesCounter = getstate().chat.newMessagesCounter || {}
        if (!messages[prj._id]) {
          messages[prj._id] = [];
        }
        if(messages[prj._id].find(message => message._id === msg._id)) return
        const update = [...messages[prj._id], msg];
        const counter = newMessagesCounter[prj._id] ?  newMessagesCounter[prj._id] + 1 : 1;
        dispatch({
          type: "UPDATE_MESSAGES_LIST",
          messages: { ...messages, [prj._id]: update }
        });
        dispatch({
          type: "UPDATE_MESSAGES_COUNTER",
          updateCounter: { [prj._id]: counter }
        });
      });
    });

    const projectsID = projectList.map(prj => prj._id);
    socket.emit("create", projectsID);
    socket.emit("login", getstate().user.username);

    axios.get(`/messages?rooms=${projectsID}`)
    .then(response =>{
      const messages = response.data.messagesList
      dispatch({
        type: "UPDATE_MESSAGES_LIST",
        messages
      });
    })
    .catch(e => {
      console.log('error =', e)
    });

  };
}
export function sendMessage({ room, username, message }) {
  const msgID = username + Date.now()
  socket.emit(room, { username, message, room, msgID });
}
export function resetCounter(prj){
  return dispatch =>{
    dispatch({
      type: "UPDATE_MESSAGES_COUNTER",
      updateCounter: { [prj]: 0 }
    });
  }
}
export function iamTyping(username){
  console.log("--------------------username----------- =", username)
  socket.emit('isTyping', username)
}
export function setTypingInterval(interval){
  return dispatch => {
    dispatch({
      type: 'SET_INTERVAL',
      interval
    })
  }
}