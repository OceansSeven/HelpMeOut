import React, { useContext } from "react";
import { Card, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppContext from "../hooks/context";
import SellIcon from "@mui/icons-material/Sell";
import { Typography } from "@mui/material";

function JobPostedCard({ data }) {
  const { setReviewJob } = useContext(AppContext);

  return (
    <div>
      <Card>
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
            <div style={{ fontVariant: "small-caps" }}>{data?.title}</div>{" "}
            <strong>
              <SellIcon />{" "}
              {data?.price_per_hour ? "$" + data?.price_per_hour : ""}
            </strong>
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
          <div>
            <Typography
              element="p"
              variant="body"
              style={{ fontVariant: "small-caps" }}
            >
              {data?.description}
            </Typography>
          </div>
          <div style={{ alignSelf: "flex-end", padding: 5 }}>
            {!data.completed && data.contractor && (
              <Link to="/leaveAReview" style={{textDecoration: 'none'}}>
                <Button
                  color="secondary"
                  size="small"
                  onClick={() => {setReviewJob(data)}}
                >
                  Mark As Complete
                </Button>
              </Link>
            )}{" "}
            {"\u00A0"}
            {data.completed ? null : (
              <Link to={`/job/edit/${data.task_id}`} style={{textDecoration: 'none'}}>
                <Button variant="contained" size="small">
                  Edit
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Card>
      <br />
    </div>
  );
}

export default JobPostedCard;
