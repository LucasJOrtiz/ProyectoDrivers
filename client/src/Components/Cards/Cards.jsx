import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import { getDrivers } from '../../Redux/Actions/Actions';

import './Cards.css'

function Cards() {
  const dispatch = useDispatch();
  const allMyDrivers = useSelector((state) => state.allDrivers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getDrivers()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const getRandomDrivers = (drivers, count) => {
    const shuffledDrivers = [...drivers].sort(() => 0.5 - Math.random());
    return shuffledDrivers.slice(0, count);
  };

  const randomDrivers = getRandomDrivers(allMyDrivers, 9);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='cards'>
      {randomDrivers.map((driver, index) => (
        <Card key={index} driver={driver} />
      ))}
    </div>
  );
}

export default Cards