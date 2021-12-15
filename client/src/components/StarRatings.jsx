import React, {useState} from "react";
import { Rating } from '@mui/material';
import { Typography } from "@material-ui/core";

export default function StarRatings(props) {
  const starValue = props.rating;
  const starSize = props.starSize || 'medium';

  return (
    <Rating
    name="half-rating-read"
    value={starValue}
    precision={0.5}
    size={starSize}
    readOnly
    />
  )
}