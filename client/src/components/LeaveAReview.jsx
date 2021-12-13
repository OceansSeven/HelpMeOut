import React, { useState, useContext } from "react";
import { Button, Container, Card, CardHeader, Paper, TextField } from "@material-ui/core";
import AppContext from '../hooks/context';

export default function LeaveAReview() {
  const { reviewJob } = useContext(AppContext);
  const [reviewBody, setReviewBody] = useState('');
  console.log(reviewJob);

  return (
    <Container>
      <Card>
        <div>{reviewJob.title}</div>
        <div>{reviewJob.description}</div>
        <div>${reviewJob.price_per_hour}/hr</div>
        <div>{reviewJob.date}</div>
        <ul>Specialties Required: {reviewJob.specialties?.map(specialty => <li key={specialty}>{specialty}</li>)}</ul>
      </Card>
      <div>Completed By: {reviewJob.contractor.firstname}{' '}{reviewJob.contractor.lastname}</div>
      <div>
        <TextField
          id="addReviewBody"
          name="addReviewBody"
          label="Review Body"
          value={reviewBody}
          variant="filled"
          onChange={(e) => {
            setReviewBody(e.target.value);
          }}
        />

      </div>
    </Container>
  )
};