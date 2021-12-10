import React, { useState, useEffect, useRef } from "react";
import { Container, Card, Paper } from "@material-ui/core";

import ContractorProfile from "./ContractorProfile.jsx";
import ClientProfile from "./ClientProfile.jsx";
import MyProfile from "./MyProfile.jsx";

const ProfileView = () => {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    firstName: "Derek",
    lastName: "Mason",
    isContractor: false,
  });
  const [isContractor, setIsContractor] = useState(false);

  useEffect(() => {
    setIsContractor(currentUser?.isContractor);
  }, [currentUser]);
  return isContractor ? (
    <MyProfile current={currentUser} />
  ) : (
    <MyProfile current={currentUser} />
  );
};

export default ProfileView;
