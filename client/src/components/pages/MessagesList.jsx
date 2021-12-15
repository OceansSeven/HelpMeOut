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
      .catch(console.log)
  }, []);

  return (
    <div>
      <h3>Conversations:</h3>
      <ListManager data={converstations} id="converstation-list" srcList="conversations">
        <MessageCard />
      </ListManager>
    </div>
  );
};

export default MessagesList;