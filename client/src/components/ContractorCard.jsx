import React, {useEffect, useState} from "react";
import { Card, Box, Grid, Typography, Button, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarRatings from "./StarRatings";
import { Link, useNavigate } from 'react-router-dom';

export default function ContractorCard({data}) {
  return (
    <Box>
        <Card className="contractor-card" variant="outlined">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Link to={`/profile/${data.id}`} style={{ textDecoration: 'none' }}>
                <div id="contractorname"><strong>{data.firstname}{' '}{data.lastname}</strong></div>
              </Link>
              {data.company && <div id="contractorcompany" >{data.company}</div>}
            </Grid>
            <Grid item xs={4} id="contractorrating" style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <StarRatings rating={Number(data.rating)} starSize={"small"}/>
            </Grid>
          </Grid>
          <div className="contractor-card-lists-container">
            {data.specialties?.length > 0 &&
              <Accordion className="contractor-specialties-list">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="contractor-specialties-accordion-summary">
                  <Typography>Specialties:{' '}{data.specialties.length}</Typography>
                </AccordionSummary>
                <AccordionDetails className="contractor-specialties">
                  {data.specialties.map((specialty, i) => <Typography key={i} className="contractor-list-item">{specialty}</Typography>)}
                </AccordionDetails>
              </Accordion>}
            {data.certifications?.length > 0 &&
              <Accordion className="contractor-certifications-list">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="contractor-certifications-accordion-summary">
                  <Typography>Certifications:{' '}{data.certifications.length}</Typography>
                </AccordionSummary>
                <AccordionDetails className="contractor-certifications">
                  {data.certifications.map((certification, i) => <Typography key={i} className="contractor-list-item">{certification}</Typography>)}
                </AccordionDetails>
              </Accordion>}
            {data.tools?.length > 0 &&
              <Accordion className="contractor-tools-list">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="contractor-tools-accordion-summary">
                  <Typography>Tools:{' '}{data.tools.length}</Typography>
                </AccordionSummary>
                <AccordionDetails className="contractor-tools">
                  {data.tools.map((tool, i) => <Typography key={i} className="contractor-list-item">{tool}</Typography>)}
                </AccordionDetails>
              </Accordion>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to={`/profile/${data.id}`} style={{ textDecoration: 'none' }}>
              <Button className="contact-contractor-button" variant="contained" color="primary">Contact</Button>
            </Link>
          </div>
        </Card>
      </Box>
  );
}
