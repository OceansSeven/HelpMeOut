import React, {useContext, useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import AppContext from '../../hooks/context';
import axios from 'axios';
import { initiateSocket, disconnectSocket, subscribeToChat, sendMessage } from '../../utils/socket-utils';
import ListManager from '../ListManager';
import Message from '../Message';

const Messages = function Messages() {
  // TODO - need to pull in user id from app context provider
  const { userId } = useContext(AppContext);
  // get URL location
  const location = useLocation();
  // get recepient from URL path
  const recepient = location.pathname.split('/').pop();

  // set chat room to be determined by the current logged in user and the recepient
  // chat room will allow one to one communication
  const [room, setRoom] = useState(`${Math.max(userId, recepient)}-${Math.min(userId, recepient)}`);

  // message is the current text input
  const [message, setMessage] = useState('');
  // chat is the chat log - which will be loaded from DB
  const [chat, setChat] = useState([]);

  // useEffect to get data from DB
  useEffect(() => {
    axios.get(`/api/messages/?user_id=${userId}&recepient_id=${recepient}`)
      .then(({data}) => {
        setChat([...data]);
        scrollToBottomOfChat();
      })
      .catch(console.log)
  }, []);

  // useEffect to initate a socket, and subscribe to chat if room changes
  useEffect(() => {
    if (room) {
      initiateSocket(room, userId);
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

  const scrollToBottomOfChat = () => {
    const messageContainer = document.getElementById('messages');
    messageContainer.scrollTo(0, messageContainer.scrollHeight);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date();
    sendMessage(room, userId, recepient, message, date);
    setMessage('');
    await axios.post(`/api/messages`, {
      from: userId,
      to: recepient,
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

  return (
    <>
      <div>
        <h1>{`Now talking with: ${recepient}`}</h1>
      </div>
      <div>{`Current user: ${userId}`}</div>
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
