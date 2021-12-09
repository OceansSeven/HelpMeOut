import React from 'react';

const Messages = function Messages() {
  return (
    <>
      <div>
        Messages
      </div>
      <div id="chat-client">
        <ul id="messages"></ul>
        <form id="form" action="">
          <input id="input" autoComplete='off' />
          <button>Send</button>
        </form>
      </div>
    </>
  );
};

export default Messages;
