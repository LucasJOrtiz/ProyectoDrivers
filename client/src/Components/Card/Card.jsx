import React from 'react';
import DefaultAPI from '../../assets/DefaultAPI.png';

import './Card.css'

function Card({ driver }) {
  const { forename, surname, teams, image } = driver;
  const fullName = `${forename} ${surname}`;
  const formattedTeams = teams ? teams : 'No teams provided';

  const renderImage = () => {
    if (image && image.url !== '') {
      return <img src={image} alt={fullName} />;
    } else {
      return <img src={DefaultAPI} alt="Default" />;
    }
  };

  return (
      <div className='card'>
        {renderImage()}
        <h2>{fullName}</h2>
        <p>{formattedTeams}</p>
      </div>
  )
}

export default Card