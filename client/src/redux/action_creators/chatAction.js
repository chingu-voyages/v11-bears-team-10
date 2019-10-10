import openSocket from "socket.io-client";

const socket = openSocket(`127.0.0.1:8000`);

export default function configureSocketIo(){
  console.log('-------------config socket io--------------')
  return (dispatch, getstate) =>{
    const {projectList} = getstate().user
    console.log('config socket projeclist =', projectList)
    socket.on("users", function(userList) {
      console.log("recieves users list")
      dispatch({type: "SET_CHAT_USERS", userList})
    });

    projectList.forEach(prj => {
      socket.on(prj.title, function(msg) {
        console.log("---------------------------------------------------------------------------------------------------------------------recieves messages")
        console.log('msg =', msg)
        const messages = getstate().chat.messages || {}
      let update = [msg];
      if (messages[prj.title]) {
        update = [...messages[prj.title], msg];
      }
        dispatch({type: "UPDATE_MESSAGES_LIST", messages: { ...messages, [prj.title]: update }})        
      });
    });

    const projectTitles = projectList.map(prj => prj.title);
    socket.emit("create", projectTitles);
    socket.emit("login", getstate().user.username);

  }
}
export function sendMessage({chatRoom, username, message}){
  console.log({chatRoom, username, message})
    socket.emit(chatRoom, { username, message });
}
