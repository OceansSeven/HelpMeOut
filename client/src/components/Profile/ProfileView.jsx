import React, { useState, useEffect, useRef } from "react";
import { Container, Card, Paper } from "@material-ui/core";

import ContractorProfile from "./ContractorProfile.jsx";
import ClientProfile from "./ClientProfile.jsx";
import EditProfile from "./EditProfile.jsx";
import MyProfile from "./MyProfile.jsx";

const ProfileView = ({ currentUser, target }) => {
  const [user, setUser] = useState({
    id: 1,
    firstName: "Derek",
    lastName: "Mason",
    isContractor: true,
    specialties: ["WOOD work", "Clogging/Unclogging Pipes"],
    tools: ["jackhammer", "quick hardening caulk"],
    certifications: ["NASM", "HR"],
  });
  const [isContractor, setIsContractor] = useState(false);

  const getTargetUser = (id) => {
    const targetID = target?.userID;

    // * * * GET PROFILE DATA FOR CLICKED PROFILE * * *
    // fetch(`/api/?userId=${targetID}`)
    // .then(res => res.json())
    // .then(data => {
    //   setUser(data);
    // })
  };

  useEffect(() => {
    setIsContractor(user?.isContractor);
  }, [user]);

  if (1 === user?.id) {
    return <EditProfile user={user} />;
  } else {
    return isContractor ? (
      <ContractorProfile user={user} />
    ) : (
      <ClientProfile user={user} />
    );
  }
};

export default ProfileView;
