import React, {useEffect} from 'react';

const Message = function Message({msg, userId}) {
  return (
    <li className={msg.from_id === userId ? 'from' : 'to'} >
      <span>
        <div>
          {`${msg.from_id === userId ? msg.from_firstname : msg.to_firstname}: ${msg.body}`}
        </div>
        <div>
          {`${new Date(msg.date).toLocaleDateString('en-US', {hour:'numeric', minute: '2-digit'})}`}
        </div>
      </span>
    </li>
  );
};

export default Message;
