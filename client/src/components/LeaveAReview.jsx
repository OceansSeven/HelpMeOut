import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import { Rating } from '@mui/material';
import { Navigate } from "react-router-dom";
import AppContext from '../hooks/context';
import { postReview } from "../utils";


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

    postReview(reviewData)
      .then(res => { setReviewSubmitted(true); alert('Thanks for Writing a Review!'); })
      .catch(err => alert('There was a problem submitting your review. Please try again?'));
  }

  if (reviewSubmitted) {
    return (<Navigate to="/main"/>)
  }

  return (
    <div className="modal">
      <div className="modal-content" style={{background: '#edebe3'}}>
      <div className="modal-header">Completed By:{' '}{reviewJob.contractor.firstname}{' '}{reviewJob.contractor.lastname}</div>
      <div className="modal-body" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
        <textarea
          className="modal-title"
          id="addReviewBody"
          name="addReviewBody"
          placeholder="Write Your Review"
          value={reviewBody}
          variant="filled"
          onChange={(e) => {
            setReviewBody(e.target.value);
          }}
          style={{minWidth: '100%', height: '100px'}}
        />
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(e, newRating) => {
            setRating(newRating);
          }}
          style={{fontSize: '30px'}}
        />
      </div>
      <Button className="modal-footer" onClick={handleSubmitReview}>Submit Review</Button>
    </div>
    </div>
  )
};