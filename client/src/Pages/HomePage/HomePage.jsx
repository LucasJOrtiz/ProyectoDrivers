import Navbar from '../../Components/Navbar/Navbar'
import Cards from '../../Components/Cards/Cards'
import './HomePage.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getDrivers } from '../../Redux/Actions/Actions';

function HomePage() {
  const dispatch = useDispatch();
  const allDrivers = useSelector((state)=> state.allDrivers);
  const [searchString, setSearchString]= useState ("");
  const [error, setError] = useState('');

  function handleChange (e){
    setSearchString (e.target.value);
    setError('');
  }

  function handleSubmit(){
    if (!searchString.trim()) {
      setError('Please enter a valid driver name.');
      return;
    }

    dispatch (getByName (searchString)).then((response) => {
      if (response.payload && response.payload.length === 0) {
        setError('Please enter a VALID driver name or CREATE a new driver');
      } else {
        setError('');
      }
    });
  }

  const clearDetail = () => {
    setSearchString("");
  }

  useEffect(() => {
    dispatch(getDrivers());
    return clearDetail;
  }, [dispatch]);

  return (
    <div className='home'>
        <h2 className='title'>Home</h2>
        <Navbar 
        searchString={searchString}
        handleChange={handleChange}
        handleSubmit={handleSubmit}/>
        {error && <p className="message">{error}</p>}
        <Cards allDrivers= {allDrivers}/>
      </div>
  );
}

export default HomePage