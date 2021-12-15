import React, {useEffect, useState} from "react";
import { Card, Box, Grid, Typography, Button, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarRatings from "./StarRatings";
import { Link, useNavigate } from 'react-router-dom';

export default function ContractorCard({data}) {
  // const [expanded, setExpanded] = useState(false);

  // const handleChange = (panel) => (e, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

  return (
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
              <Accordion className="contractor-specialties-list">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="contractor-specialties-accordion-summary">
                  <Typography>Specialties:{' '}{data.specialties.length}</Typography>
                </AccordionSummary>
                <AccordionDetails className="contractor-specialties">
                  {data.specialties.map((specialty, i) => <Typography key={i} className="contractor-list-item">{specialty}</Typography>)}
                </AccordionDetails>
              </Accordion>}
            {data.certifications &&
              <Accordion className="contractor-certifications-list">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="contractor-certifications-accordion-summary">
                  <Typography>Certifications:{' '}{data.certifications.length}</Typography>
                </AccordionSummary>
                <AccordionDetails className="contractor-certifications">
                  {data.certifications.map((certification, i) => <Typography key={i} className="contractor-list-item">{certification}</Typography>)}
                </AccordionDetails>
              </Accordion>}
            {data.tools &&
              <Accordion className="contractor-tools-list">
                <AccordionSummary expandIcon={<ExpandMoreIcon />} id="contractor-tools-accordion-summary">
                  <Typography>Tools:{' '}{data.tools.length}</Typography>
                </AccordionSummary>
                <AccordionDetails className="contractor-tools">
                  {data.tools.map((tool, i) => <Typography key={i} className="contractor-list-item">{tool}</Typography>)}
                </AccordionDetails>
              </Accordion>}
          </div>
          <Link to={`/profile/${data.id}`} style={{ textDecoration: 'none' }}>
            <Button className="contact-contractor-button" variant="contained" color="primary">Contact</Button>
          </Link>
        </Card>
      </Box>
  );
}
