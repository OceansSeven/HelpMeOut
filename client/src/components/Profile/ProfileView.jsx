import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Card, Paper } from "@material-ui/core";

import ContractorProfile from "./ContractorProfile.jsx";
import ClientProfile from "./ClientProfile.jsx";
import EditProfile from "./EditProfile.jsx";
import MyProfile from "./MyProfile.jsx";
import AppContext from "../../hooks/context.js";

const ProfileView = ({ targetID }) => {
  const currentUser = useContext(AppContext);
  const [isContractor, setIsContractor] = useState();
  const [target, setTarget] = useState();

  const getTargetUser = (id) => {};

  useEffect(() => {
    setIsContractor(currentUser.user.contractor);
    if (!target) {
      setTarget(currentUser.user);
    }
    console.log(target);
  }, [target]);
  if (!target) {
    return <div>Loading....</div>;
  }
  if (target?.id === currentUser?.user.id) {
    return <MyProfile user={target} />;
  } else {
    return isContractor ? (
      <ContractorProfile user={target} />
    ) : (
      <ClientProfile user={target} />
    );
  }
};

export default ProfileView;
