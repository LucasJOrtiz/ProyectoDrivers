import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import Card from '../Card/Card';

import './Cards.css'

function Cards() {
  const allDrivers = useSelector((state) => state.allMyDrivers);

  const getRandomDrivers = (drivers, count) => {
    const shuffledDrivers = [...drivers].sort(() => 0.5 - Math.random());
    return shuffledDrivers.slice(0, count);
  };

  const randomDrivers = getRandomDrivers(allDrivers, 9);

  return (
    <div className='cards'>
      {randomDrivers.map((driver) => (
        <Card key={driver.id} driver={driver} />
      ))}
    </div>
  );
}

export default Cards
