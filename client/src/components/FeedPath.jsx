import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import AppContext from '../hooks/context.js';

const FeedPath = () => {
  const { feedPath } = useContext(AppContext);
  const finalPath = feedPath.subMainView ? feedPath.mainView + ' ' + '>' + ' ' + feedPath.subMainView : feedPath.mainView;

  return (
    <Typography component="p" variant="caption" className="feed-path">
      {feedPath.pagePath}{' '}{'>'}{' '}{finalPath}
    </Typography>
  );
}

export default FeedPath;
