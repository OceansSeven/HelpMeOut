import React from "react";

function ListManager({children, data, id}){
  //data refers to an array of Objects containing necessary props for sub-component

  return (
    <div className="list" id={id}>
      {data.map((obj, i) => (
        React.cloneElement(children, {data: obj, key: i})
      ))}
    </div>
  );
}

export default ListManager;

/*
  <ListManager data={<array of objs>} id={<id for list>}>
    <Message />
  </ListManager>
*/
