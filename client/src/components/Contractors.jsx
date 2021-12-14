import React, {useEffect, useState} from "react";
import { Paper } from '@material-ui/core';
import StarRatings from "./StarRatings";
import { Link, useNavigate } from 'react-router-dom';

export default function Contractors({data}) {

  return (
    <Link to={`/profile/${data.id}`}>
      <Paper>
        <div id="contractorname">{data.firstname} {data.lastname}</div>
        <div id="contractorcompany">{data.company}</div>
        <div id="contractorspecialties">{data.specialties ? data.specialties.map((specialty, i) =>
          <span key={i}>{specialty}{i===data?.specialties?.length - 1 ? '' : ', '}</span>
        )
      :null}
        </div>
        <div id="contractorcertifications">{data.certifications ? data.certifications.map((certification, i) =>
          <span key={i}>{certification}{i===data?.specialties?.length - 1 ? '' : ', '}</span>

        )
        :null}
        </div>
        <div id="contractortools">{data.tools ? data.tools.map((tool, i) =>
          <span key={i}>{tool}{i===data?.specialties?.length - 1 ? '' : ', '}</span>
        )
      :null}
        </div>
        <div id="contractorrating"><StarRatings rating={Number(data.rating)}/></div>
      </Paper>
    </Link>
  );
}