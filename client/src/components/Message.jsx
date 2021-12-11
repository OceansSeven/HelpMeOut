import React, {useContext} from 'react';
import AppContext from '../hooks/context';

const Message = function Message({data}) {
  const {user} = useContext(AppContext);

  return (
    <div className={(data.from_id === Number(user.id) || data.fromId === Number(user.id)) ? 'from' : 'to'} >
      <span className='message-container'>
        <div className='message-from'>
          {`${data.from_firstname} ${data.from_lastname}`}
        </div>
        <div className='message-contents'>
          {`${data.body}`}
        </div>
        <div className='message-time'>
          {`${new Date(data.date).toLocaleDateString('en-US', {hour:'numeric', minute: '2-digit'})}`}
        </div>
      </span>
    </div>
  );
};

export default Message;
