import Navbar from '../../Components/Navbar/Navbar'
import Cards from '../../Components/Cards/Cards'
import './HomePage.css'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByName, getDrivers, getBySource } from '../../Redux/Actions/Actions';

function HomePage() {
  const dispatch = useDispatch();
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

//Filtros
  const allDrivers = useSelector((state)=> state.allDrivers);
  const allTeams = useSelector((state) => state.allTeams);
  const [selectedSource, setSelectedSource] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  
  const handleSourceFilter = (source) => {
    if (source === 'API' || source === 'DB') {
      dispatch(getBySource(source)).then((response) => {
        if (response.payload) {
          setFilteredDrivers(response.payload);
          setSelectedSource(source);
        }
        });
        } else if (source === '') { 
          dispatch(getDrivers()).then((response) => {
            if (response.payload) {
              setFilteredDrivers(response.payload);
              setSelectedSource('');
            }
          });
    } else {
      console.error('Invalid source. Please select a valid source.');
    }
  };
  
return (
  <div className='home'>
      <h2 className='title'>Home</h2>

      <Navbar 
      searchString={searchString}
      handleChange={handleChange}
      handleSubmit={handleSubmit}/>

    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p style={{ marginRight: '10px' }}>Drivers from:</p>
      <select value={selectedSource} onChange={(e) => handleSourceFilter(e.target.value)}>
        <option value="">All Sources</option>
        <option value="API">API</option>
        <option value="DB">Database</option>
      </select>
    </div>

    <div className='drivers-list'>
        {filteredDrivers.map(driver => (
          <div key={driver.id}>
            <p>{driver.name}</p>
          </div>
        ))}
    </div>

      {error && <p className="message">{error}</p>}

      <Cards allDrivers= {allDrivers}/>
    </div>
  );
}

export default HomePage