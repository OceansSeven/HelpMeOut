import React, {useContext} from 'react';
import AppContext from '../hooks/context';

const Message = function Message({data}) {
  const {userId} = useContext(AppContext);

  return (
    <div className={(data.from_id === userId || data.fromId === userId) ? 'from' : 'to'} >
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
