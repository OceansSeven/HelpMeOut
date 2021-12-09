import React, { useState, useEffect, useRef } from "react";
import { Container, Card, Paper } from "@material-ui/core";

import ContractorProfile from "./ContractorProfile.jsx";
import ClientProfile from "./ClientProfile.jsx";

const ProfileView = () => {
  const [isContractor, setIsContractor] = useState(true);
  // On render setIsContractor based on current user
  useEffect(() => {
    //  setIsContractor(currentUser.isContractor)
  }, []); //  <--- Current user will be watched in here
  return isContractor ? <ContractorProfile /> : <ClientProfile />;
};

export default ProfileView;
