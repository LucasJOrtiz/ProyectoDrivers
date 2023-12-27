import React from 'react';
import './Card.css'

function Card({ driver }) {
  const { Name, Lastname, Teams, Image_url } = driver;
  const fullName = `${Name} ${Lastname}`;
  const formattedTeams = Teams ? Teams : 'No teams provided';

  return (
      <div className='card'>
        <img src={Image_url} alt={fullName} />
        <h2>{fullName}</h2>
        <p>{formattedTeams}</p>
      </div>
  )
}

export default Card