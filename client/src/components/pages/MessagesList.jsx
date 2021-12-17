import React, {useContext, useEffect, useState} from 'react';
import ListManager from '../ListManager';
import MessageCard from '../MessageCard';
import AppContext from '../../hooks/context';
import axios from 'axios';

const MessagesList = function () {
  const {user} = useContext(AppContext);
  const [converstations, setConverstations] = useState([]);

  useEffect(() => {
    axios.get(`/api/conversations/${user.id}`)
      .then(({data}) => {
        setConverstations([...data]);
      })
      .catch(console.log);
  }, []);

  return (
    // 56xp is the height of the app header bar
    <div id="conversation-container" style={{height: `${window.innerHeight - 56}px`}}>
      <div id="conversations-header">
        <h2 style={{paddingLeft: '8px', marginBottom: '0px', paddingTop: '12px', paddingBottom: '0px', }}>CONVERSATIONS</h2>
      </div>
      <div id="conversation-list-container">
        <ListManager data={converstations} id="conversation-list" srcList="conversations">
          <MessageCard />
        </ListManager>
      </div>
    </div>
  );
};

export default MessagesList;