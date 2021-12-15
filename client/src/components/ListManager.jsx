import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';
import React from "react";

function ListManager({children, data, id, setJobsAccepted, srcList}){
  //data refers to an array of Objects containing necessary props for sub-component
  // console.log(children);
  let noDataMessage = (<div></div>);

  if (srcList === 'client') {
    noDataMessage = (<div style={{textAlign: 'center', justifyContent: 'center'}}>
      There's nothing here yet! <br/>
      <Link to='/job'><Button variant='contained' size='small'>Post a Job</Button></Link>
    </div>)
  } else if (srcList === 'contractor') {
    noDataMessage = (<div>There's nothing here yet!</div>);
  } else {
    noDataMessage = (<div></div>);
  }




  return (
    <div className="list" id={id}>
      {data.length ? data?.map((obj, i) => (
        React.cloneElement(children, {data: obj, key: i, setJobsAccepted: setJobsAccepted})
      )) : noDataMessage}
    </div>
  );
}

export default ListManager;

/*
  <ListManager data={<array of objs>} id={<id for list>}>
    <Message />
  </ListManager>
*/
