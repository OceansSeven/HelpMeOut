import React, {useContext, useEffect, useState} from 'react';
import {useLocation, Navigate} from 'react-router-dom';
import AppContext from '../../hooks/context';
import axios from 'axios';
import { initiateSocket, disconnectSocket, subscribeToChat, sendMessage } from '../../utils/socket-utils';
import ListManager from '../ListManager';
import Message from '../Message';

const Messages = function Messages() {
  const { user } = useContext(AppContext);
  // get URL location
  const location = useLocation();
  // get recepient from URL path
  // need to get recepient information
  const [recepient, setRecepient] = useState({
    user_id: location.pathname.split('/').pop(),
    firstname: null,
    lastname: null
  });

  // set chat room to be determined by the current logged in user and the recepient
  // chat room will allow one to one communication
  const [room, setRoom] = useState(`${Math.max(Number(user.id), recepient.user_id)}-${Math.min(Number(user.id), recepient.user_id)}`);

  // message is the current text input
  const [message, setMessage] = useState('');
  // chat is the chat log - which will be loaded from DB
  const [chat, setChat] = useState([]);

  const [validUser, setValidUser] = useState(true);

  // useEffect to get data from DB
  useEffect(() => {
    Promise.all([
      axios.get(`/api/messages/?user_id=${user.id}&recepient_id=${recepient.user_id}`),
      axios.get(`/api/user/${recepient.user_id}`)
    ])
      .then(([chatData, recepientData]) => {
        if (recepientData.data) {
          setRecepient(recepientData.data);
        } else {
          setValidUser(false);
        }
        setChat([...chatData.data]);
        scrollToBottomOfChat();
      })
      .catch(console.log)
  }, []);

  // useEffect to initate a socket, and subscribe to chat if room changes
  useEffect(() => {
    if (room) {
      initiateSocket(room, user.id);
    }

    subscribeToChat((err, data) => {
      if (err) {
        return;
      }
      // update chat logs variable
      setChat(oldChats => [...oldChats, data]);
    })

    return () => {
      disconnectSocket();
    }
  }, [room]);

  useEffect(() => {
    scrollToBottomOfChat();
  },[chat])

  const scrollToBottomOfChat = () => {
    const messageContainer = document.getElementById('messages');
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date();
    sendMessage(room, user.id, recepient, message, date);
    setMessage('');
    await axios.post(`/api/messages`, {
      from: user.id,
      to: recepient.user_id,
      body: message,
      date
    })
      .then(scrollToBottomOfChat)
      .catch(console.log)
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setMessage(e.target.value);
  }

  if (!validUser) {
    return <Navigate to="/main"/>
  }

  return (
    <>
      <div>
        <h1>{`Now talking with: ${recepient.firstname} ${recepient.lastname} (${recepient.user_id})`}</h1>
      </div>
      <div>{`Current user: ${user.id}`}</div>
      {/* Chat box */}
      <div id="chat-client">
        <ListManager data={chat} id={'messages'}>
          <Message />
        </ListManager>
        <form id="form" onSubmit={(e) => {
            if (message !== '') {
              handleSubmit(e);
            }
          }}>
          <input type="text" id="input" autoComplete='off' value={message} onChange={handleInputChange}/>
          <button onClick={(e) => {
            if (message !== '') {
              handleSubmit(e);
            }
          }}>Send</button>
        </form>
      </div>
    </>
  );
};

export default Messages;
