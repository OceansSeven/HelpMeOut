import React, {useContext, useEffect} from 'react';
import { Card } from "@material-ui/core";
import { Link } from 'react-router-dom';

const MessagesList = function ({data}) {

  return (
    <Link to={`/messages/${data.id}`} style={{ textDecoration: 'none', color: 'black' }}>
      <Card style={{padding: '8px'}}>
        <h5>
          {`${data.firstname} ${data.lastname}`}
        </h5>
        {`Company: ${data.company}`}
      </Card>
    </Link>
  );
};

export default MessagesList;