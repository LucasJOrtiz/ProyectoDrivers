import Navbar from '../../Components/Navbar/Navbar'
import Cards from '../../Components/Cards/Cards'
import './HomePage.css'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getDrivers } from '../../Redux/Actions/Actions';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  return (
    <div className='home'>
        <h2 className='title'>Home</h2>
        <Navbar/>
        <Cards/>
      </div>
  );
}

export default HomePage