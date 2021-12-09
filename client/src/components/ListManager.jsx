import React from "react";

function ListManager({children, data, id}){
  //data refers to an array of Objects containing necessary props for sub-component

  return (
    <div className="list" id={id}>
      {children.map((child) => {
        data.map((obj, i) => {
          //create new component of type child for each piece of data in set
          React.cloneElement(child, { data: obj, key: i});
        });
      })};
    </div>
  );
}

export default ListManager;

/*
  <ListManager data={<array of objs>}>
    <Message />
  </ListManager>
*/
