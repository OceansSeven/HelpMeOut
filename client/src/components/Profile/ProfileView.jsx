import React, { useState, useEffect, useRef } from "react";
import { Container, Card, Paper } from "@material-ui/core";

const ProfileView = () => {
  const [isContractor, setIsContractor] = useState(false);

  return isContractor ? <ContractorProfile /> : <ClientProfile />;
};

export default ProfileView;
