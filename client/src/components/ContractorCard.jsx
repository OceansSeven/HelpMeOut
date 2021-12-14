import React, {useEffect, useState} from "react";
import { Card, Box, Grid } from '@material-ui/core';
import StarRatings from "./StarRatings";
import { Link, useNavigate } from 'react-router-dom';

export default function ContractorCard({data}) {

  return (
    <Link to={`/profile/${data.id}`} style={{ textDecoration: 'none' }}>
      <Box>
        <Card className="contractor-card" variant="outlined">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <div id="contractorname">Name:{' '}{data.firstname}{' '}{data.lastname}</div>
              {data.company && <div id="contractorcompany">Company:{' '}{data.company}</div>}
            </Grid>
            <Grid item xs={4} id="contractorrating" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <StarRatings rating={Number(data.rating)}/>
            </Grid>
          </Grid>
          <div className="contractor-card-lists-container">
            {data.specialties &&
              <Card className="contractor-specialties-list">
                  <div><strong>Specialties:</strong></div>
                  <div className="contractorspecialties">
                    {data.specialties.map((specialty, i) => <li key={i}>{specialty}</li>)}
                  </div>
              </Card>}
            {data.certifications &&
              <Card className="contractor-certifications-list">
                <div><strong>Certifications:</strong></div>
                <Grid container className="contractorcertifications" spacing={2} columns={{ xs: 2, sm: 3, md: 4 }} direction="column" alignItems="flex-start" justifyContent="flex-start">
                  {data.certifications.map((certification, i) => <Grid item xs={6} md={3} key={i}><li>{certification}</li></Grid>)}
                </Grid>
              </Card>}
            {data.tools &&
              <Card className="contractor-tools-list">
                <div><strong>Tools:</strong></div>
                <div className="contractortools">
                  {data.tools.map((tool, i) =><li key={i}>{tool}</li>)}
                </div>
              </Card>}
          </div>
        </Card>
      </Box>
    </Link>
  );
}