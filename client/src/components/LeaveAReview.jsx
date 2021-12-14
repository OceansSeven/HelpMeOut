import React, { useState, useContext } from "react";
import { Button, Container, Card, CardHeader, Paper, TextField } from "@material-ui/core";
import { Rating } from '@mui/material';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import AppContext from '../hooks/context';

export default function LeaveAReview() {
  const { reviewJob, user } = useContext(AppContext);
  const [reviewBody, setReviewBody] = useState('');
  const [rating, setRating] = useState(null);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSubmitReview = () => {
    if (!rating || reviewBody === '') {
      return alert('Please Submit a Review');
    }

    const reviewData = {
      jobId: reviewJob.task_id,
      clientId: user.id,
      contractorId: reviewJob.contractor.id,
      reviewRating: rating,
      reviewBody: reviewBody,
      date: new Date(),
      contractorRating: reviewJob.contractor.rating,
      contractorJobs: reviewJob.contractor.jobsCompleted
    }
    axios.post('/api/reviews', reviewData)
      .then((res) => { setReviewSubmitted(true); alert('Thanks for Writing a Review!'); })
      .catch(err => alert('There was a problem submitting your review. Please try again?'));
  }

  if (reviewSubmitted) {
    return (<Navigate to="/main"/>)
  }

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
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(e, newRating) => {
            setRating(newRating);
          }}
        />
      </div>
      <Button onClick={handleSubmitReview}>Submit Review</Button>
    </Container>
  )
};