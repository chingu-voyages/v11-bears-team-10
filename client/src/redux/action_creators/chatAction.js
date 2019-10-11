import openSocket from "socket.io-client";
import axios from "axios";

const socket = openSocket(`127.0.0.1:8000`);

export default function configureSocketIo() {
  return (dispatch, getstate) => {
    const { projectList } = getstate().user;
    socket.on("users", function(userList) {
      dispatch({ type: "SET_CHAT_USERS", userList });
    });

    projectList.forEach(prj => {
      socket.on(prj._id, function(msg) {
      console.log("message recieved =", msg)
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
      console.log('get messages =', response)
      const messages = response.data.messagesList
      dispatch({
        type: "UPDATE_MESSAGES_LIST",
        messages
      });
    })
    .catch(e => {
      console.log('error =', e)
      // if (!e.response)
      //   dispatch(setError({ requestTimeout: e.code === "ECONNABORTED" }));
      // else if (e.response.status !== 401)
      //   dispatch(setError({ statusCode: e.response.status }));
    });

  };
}
export async function sendMessage({ room, username, message }) {
  console.log('sendmessage =', message)
  await socket.emit(room, { username, message, room });
}
export function resetCounter(prj){
  return dispatch =>{
    dispatch({
      type: "UPDATE_MESSAGES_COUNTER",
      updateCounter: { [prj]: 0 }
    });
  }
}
