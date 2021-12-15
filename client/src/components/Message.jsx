import React, {useContext} from 'react';
import AppContext from '../hooks/context';

const Message = function Message({data}) {
  const {user} = useContext(AppContext);

  return (
    <div className={(Number(data.from_id) === Number(user.id) || Number(data.fromId) === Number(user.id)) ? 'from' : 'to'} >
      <span className='message-container'>
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
