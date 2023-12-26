import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';

import Card from '../Card/Card';

import './Cards.css'

function Cards() {
  const allDrivers = useSelector((state) => state.allMyDrivers);

const [randomDriverIndices, setRandomDriverIndices] = useState([]);

useEffect(() => {
  const getRandomIndices = () => {
    const indices = [];
    while (indices.length < 9) {
      const randomIndex = Math.floor(Math.random() * allDrivers.length);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  setRandomDriverIndices(getRandomIndices());
}, [allDrivers]);

const randomDrivers = randomDriverIndices.map((index) => allDrivers[index]);

  return (
    <div className='cards'>
      {randomDrivers.map((driver) => (
        <Card key={driver.id} driver={driver} />
      ))}
    </div>
  );
}

export default Cards

// function Cards() {

//   return (
//     <div className='cards'>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//         <Card/>
//       </div>
//   )
// }

// export default Cards
