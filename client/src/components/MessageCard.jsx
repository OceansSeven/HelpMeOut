import React, {useContext, useEffect} from 'react';
import { Paper } from "@material-ui/core";
import { Link } from 'react-router-dom';

const MessagesList = function ({data}) {

  return (
    <Link to={`/messages/${data.id}`}>
      <Paper style={{ textDecoration: 'none', color: 'black' }}>
        {`${data.firstname} ${data.lastname}`}
      </Paper>
    </Link>
  );
};

export default MessagesList;