import React, { useContext } from "react";
import AppContext from '../hooks/context.js';

const FeedPath = () => {
  const { feedPath } = useContext(AppContext);
  const finalPath = feedPath.subMainView ? feedPath.mainView + ' ' + '>' + ' ' + feedPath.subMainView : feedPath.mainView;

  return (
    <div>
      {feedPath.pagePath}{' '}{'>'}{' '}{finalPath}
    </div>
  );
}

export default FeedPath;
