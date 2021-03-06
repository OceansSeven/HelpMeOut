import React, {useContext, useEffect, useState} from 'react';
import {useLocation, Navigate} from 'react-router-dom';
import { Button } from "@material-ui/core";
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
    id: location.pathname.split('/').pop(),
    firstname: null,
    lastname: null
  });

  // set chat room to be determined by the current logged in user and the recepient
  // chat room will allow one to one communication
  const [room, setRoom] = useState(`${Math.max(Number(user.id), recepient.id)}-${Math.min(Number(user.id), recepient.id)}`);

  // message is the current text input
  const [message, setMessage] = useState('');
  // chat is the chat log - which will be loaded from DB
  const [chat, setChat] = useState([]);

  const [validUser, setValidUser] = useState(true);

  // useEffect to get data from DB
  useEffect(() => {
    Promise.all([
      axios.get(`/api/messages/?user_id=${user.id}&recepient_id=${recepient.id}`),
      axios.get(`/api/user/${recepient.id}`)
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
    const messageContainer = document.getElementById('messages-list-container');
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date();
    sendMessage(room, user.id, recepient, message, date);
    setMessage('');
    await axios.post(`/api/messages`, {
      from: user.id,
      to: recepient.id,
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
    // 56xp is the height of the app header bar
    <div id="chat-client-container" style={{height: `${window.innerHeight - 56}px`}}>
      <div id="chat-client-title">
        <h1 style={{margin: '0', padding: '8px'}}>{`${recepient.firstname} ${recepient.lastname}`}</h1>
        {recepient.company ? <h5 style={{margin: '0', padding: '0 8px', paddingBottom: '8px'}}>{`Company: ${recepient.company}`}</h5> : ''}
      </div>
      {/* Chat box */}
      <div id="chat-client">
        <div id="messages-list-container">
          <ListManager data={chat} id={'messages'} srcList="messages">
            <Message />
          </ListManager>
        </div>
      </div>
      <div id="chat-form-container">
        <form id="chat-form" onSubmit={(e) => {
            if (message !== '') {
              handleSubmit(e);
            }
          }}>
          <input type="text" id="chat-input" autoComplete='off' value={message} onChange={handleInputChange}/>
          <Button variant="contained" onClick={(e) => {
            if (message !== '') {
              handleSubmit(e);
            }
          }}>Send</Button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
