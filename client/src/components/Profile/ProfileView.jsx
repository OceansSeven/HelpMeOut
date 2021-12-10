import React, { useState, useEffect, useRef } from "react";
import { Container, Card, Paper } from "@material-ui/core";

import ContractorProfile from "./ContractorProfile.jsx";
import ClientProfile from "./ClientProfile.jsx";
import MyProfile from "./MyProfile.jsx";

const ProfileView = ({ currentUser, target }) => {
  const [user, setUser] = useState({
    id: 1,
    firstName: "Derek",
    lastName: "Mason",
    isContractor: false,
  });
  const [isContractor, setIsContractor] = useState(false);

  const getTargetUser = (id) => {
    const targetID = target?.userID;

    // fetch(`/api/?userId=${targetID}`)
    // .then(res => res.json())
    // .then(data => {
    //   setUser(data);
    // })
  };

  useEffect(() => {
    setIsContractor(user?.isContractor);
  }, [user]);

  if (currentUser?.id === user?.id) {
    return <MyProfile user={user} />;
  } else {
    return isContractor ? (
      <ContractorProfile user={user} />
    ) : (
      <ClientProfile user={user} />
    );
  }
};

export default ProfileView;
