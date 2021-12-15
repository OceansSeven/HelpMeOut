import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Card, Paper } from "@material-ui/core";
import { useLocation } from "react-router-dom";

import ContractorProfile from "./ContractorProfile.jsx";
import ClientProfile from "./ClientProfile.jsx";
import EditProfile from "./EditProfile.jsx";
import MyProfile from "./MyProfile.jsx";
import AppContext from "../../hooks/context.js";

const ProfileView = () => {
  const { user } = useContext(AppContext);
  const [isContractor, setIsContractor] = useState(false);
  const [target, setTarget] = useState();
  // console.log("currentUser: ", currentUser);

  const location = useLocation();

  const targetProfileId = location.pathname.split("/").pop();
  // console.log("targetProfileId: ", targetProfileId);
  // console.log("target: ", target);


  const getTargetUser = (id) => {};

  useEffect(() => {
    if (!target) {
      fetch(`/api/user/${targetProfileId}`)
        .then((res) => res.json())
        .then((data) => {
          setTarget(data);
          setIsContractor(data.contractor);
        });
    }
    // console.log(target);
  }, [target]);

  if (!target) {
    return <div>Loading....</div>;
  }
  if (targetProfileId === user?.id) {
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
