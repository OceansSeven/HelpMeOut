import React, { useContext, useState } from "react";
import { Card, Button } from "@material-ui/core";
import AppContext from "../hooks/context";
import { Link } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";

function JobAvailableCard({ data }) {
  const user = useContext(AppContext).user;
  const [accepted, setAccepted] = useState(false);
  const [alreadyAccepted, setAlreadyAccepted] = useState(data.accepted);

  async function acceptJob(props) {
    await axios
      .put("/api/jobs", { contractor_id: user.id, id: data.id })
      .then((result) => {
        setAccepted(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Card variant="outlined">
        <div className="detail-container">
          <Typography
            element="p"
            variant="caption"
            style={{ fontSize: "12px" }}
          >
            {data?.date}
          </Typography>
          <Typography element="h4" variant="h4">
            {" "}
            <strong style={{ fontVariant: "small-caps" }}>
              {data?.title}
            </strong>{" "}
          </Typography>
          <Typography element="h4" variant="subtitle2">
            Budget: ${data?.price_per_hour} <SellIcon />
          </Typography>

          <Typography element="h5" variant="subtitle2">
            {" "}
            {data?.client.firstname} {data?.client.lastname}.
          </Typography>
          <Typography
            element="p"
            variant="caption"
            style={{ color: "#748cab" }}
          >
            Category(s):{" "}
            {data?.specialties.map((category, i) => (
              <span key={i}>
                {category}
                {i === data?.specialties?.length - 1 ? "" : ", "}
              </span>
            ))}
          </Typography>
          <div className="description-box">
            {" "}
            <Typography
              element="p"
              variant="body"
              style={{ fontVariant: "small-caps" }}
            >
              {data?.description}
            </Typography>
          </div>
          <div style={{ alignSelf: "flex-end" }}>
            {accepted ? null : alreadyAccepted ? null : (
              <Button variant="contained" size="small" onClick={acceptJob}>
                Accept
              </Button>
            )}
            <Link to={`/profile/${data.client.id}`}>
              <Button variant="contained" size="small">
                Contact
              </Button>
            </Link>
          </div>
          <div>
            {accepted ? (
              <span id="jobacceptedbttn" style={{ textAlign: "center" }}>
                Job accepted!
              </span>
            ) : null}
          </div>
        </div>
      </Card>
      <br />
    </div>
  );
}

export default JobAvailableCard;
