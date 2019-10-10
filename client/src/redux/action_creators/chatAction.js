import openSocket from "socket.io-client";

const socket = openSocket(`127.0.0.1:8000`);

export default function configureSocketIo() {
  return (dispatch, getstate) => {
    const { projectList } = getstate().user;
    socket.on("users", function(userList) {
      dispatch({ type: "SET_CHAT_USERS", userList });
    });

    projectList.forEach(prj => {
      socket.on(prj.title, function(msg) {
      console.log("message recieved =", msg)
        const messages = getstate().chat.messages || {};
        const newMessagesCounter = getstate().chat.newMessagesCounter || {}
        if (!messages[prj.title]) {
          messages[prj.title] = [];
        }
        if(messages[prj.title].find(message => message._id === msg._id)) return
        const update = [...messages[prj.title], msg];
        const counter = newMessagesCounter[prj.title] ?  newMessagesCounter[prj.title] + 1 : 1;
        dispatch({
          type: "UPDATE_MESSAGES_LIST",
          messages: { ...messages, [prj.title]: update }
        });
        dispatch({
          type: "UPDATE_MESSAGES_COUNTER",
          updateCounter: { [prj.title]: counter }
        });
      });
    });

    const projectTitles = projectList.map(prj => prj.title);
    socket.emit("create", projectTitles);
    socket.emit("login", getstate().user.username);
  };
}
export async function sendMessage({ chatRoom, username, message }) {
  await socket.emit(chatRoom, { username, message });
}
export function resetCounter(prj){
  return dispatch =>{
    dispatch({
      type: "UPDATE_MESSAGES_COUNTER",
      updateCounter: { [prj]: 0 }
    });
  }
}
