import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../Card/Card';
import { getDrivers } from '../../Redux/Actions/Actions';

import './Cards.css'

function Cards({ allDrivers, currentPage, changePage }) {
  const dispatch = useDispatch();
  const allMyDrivers = useSelector((state) => state.allDrivers);
  const [loading, setLoading] = useState(true);
  const driversPerPage = 9;
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = allMyDrivers.slice(
    indexOfFirstDriver,
    indexOfLastDriver
  );

  useEffect(() => {
    dispatch(getDrivers()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allDrivers.length / driversPerPage); i++) {
    pageNumbers.push(i);
  }

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='cards-wrapper'>
      <div>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => changePage(number)} className="pagination">
            {number}
          </button>
        ))}
      </div>

    <div className='cards'>
      {currentDrivers.map((driver, index) => (
        <Card key={index} driver={driver} />
      ))}
    </div>
    </div>
  );
}

export default Cards