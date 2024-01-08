import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-use-history';
import { Link } from 'react-router-dom';
import { getTeams, createDriver } from '../../Redux/Actions/Actions';
import './FormPage.css'

function FormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const teamsData = useSelector((state) => state.allTeams || []);
  
  useEffect(() => {
    dispatch(getTeams());
  }, [dispatch]);

  const [input, setInput] = useState({
    forename: '',
    surname: '',
    image: '',
    dob: '',
    nationality: '',
    description: '',
    teams: [],
  });

  const [error, setError] = useState ({
    forename: '',
    surname: '',
    image: '',
    dob: '',
    nationality: '',
    description: '',
    teams: '',
  })
  
  const [backendError, setBackendError] = useState('');

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...error };
    
    if (!input.forename.trim()) {
      newErrors.forename = ' Name is required';
      valid = false;
    } else {
      newErrors.forename = '';
    }

    if (!input.surname.trim()) {
      newErrors.surname = ' Lastname is required';
      valid = false;
    } else {
      newErrors.surname = '';
    }
    
    if (input.teams.length === 0) {
      newErrors.teams = ' Select at least one';
      valid = false;
    } else {
      newErrors.teams = '';
    }
    
    if (input.image && !isValidImageUrl(input.image)) {
      newErrors.image = ' Need a valid image link';
      valid = false;
    } else {
      newErrors.image = '';
    }
    
    if (input.dob && !isValidDate(input.dob)) {
      newErrors.dob = ' In format: yyyy-mm-dd';
      valid = false;
    } else {
      newErrors.dob = '';
    }
    
    newErrors.nationality = '';
    newErrors.description = '';
    
    setError(newErrors);

    return valid;
    };
  
    const isValidDate = (dateString) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(dateString);
    };

    const isValidImageUrl = (url) => {
      if (!url) {
        return true;
      }
      return url.match(/\.(jpeg|jpg|gif|png)$/) !== null;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let teamsArray = Array.isArray(selectedTeams) ? selectedTeams : [selectedTeams];
    const formattedTeams = teamsArray.join(', ');
  
    const updatedInput = {
      forename: input.forename,
      surname: input.surname,
      teams: formattedTeams, 
      ...(input.image && isValidImageUrl(input.image) && { image: input.image }),
      ...(input.dob && isValidDate(input.dob) && { dob: input.dob }),
      ...(input.nationality && { nationality: input.nationality }),
      ...(input.description && { description: input.description }),
    };
  
    setInput(updatedInput);
  
    if (validateForm()) {
      if (e.nativeEvent.submitter && e.nativeEvent.submitter.type === "submit") {
        try {
          const response = await dispatch(createDriver(updatedInput));
          if (response && response.error) {
            setBackendError(response.error.message);
            return;
          }
          setInput({
            forename: '',
            surname: '',
            image: '',
            dob: '',
            nationality: '',
            description: '',
            teams: [],
          });
          setBackendError('');
          history.push('/created');
        } catch (error) {
          setBackendError('This Driver already exists');
        }
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    setInput({
      ...input,
      [name]: value,
    });
  
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

const [selectedTeams, setSelectedTeams] = useState([]);

const handleMultipleTeams = (selectedTeam) => {

  if (selectedTeams.includes(selectedTeam)) {
    setSelectedTeams((prevSelectedTeams) =>
      prevSelectedTeams.filter((team) => team !== selectedTeam)
    );
    setInput({
      ...input,
      teams: input.teams.filter((team) => team !== selectedTeam),
    });
  } else {
    setSelectedTeams((prevSelectedTeams) => [...prevSelectedTeams, selectedTeam]);
    setInput({
      ...input,
      teams: [...input.teams, selectedTeam],
    });
  }
};


  return (
    <div>
        <button className="nav-button">
          <Link to="/welcome">Welcome</Link>
        </button>
        <button className="nav-button">
          <Link to="/home">Home</Link>
        </button>
        <button className="nav-button">
          <Link to="/aboutme">About Me</Link>
        </button>

      <h1>Create a New Driver</h1>
      <div className="container">
      <form onSubmit={handleSubmit}>
      {backendError && <div style={{ color: 'red' }}>{backendError}</div>}
        <div>
         <label>* </label>
            <input
              type="text"
              placeholder="Name"
              name="forename"
              value={input.forename}
              onChange={handleChange}
            />
            {error.forename && <span>{error.forename}</span>}
        </div>

        <div>
          <label>* </label>
            <input
              type="text"
              placeholder="Lastname"
              name="surname"
              value={input.surname}
              onChange={handleChange}
            />
            {error.surname && <span>{error.surname}</span>}
        </div>

        <div>
            <input
              type="text"
              placeholder="Date of Birth"
              name="dob"
              value={input.dob}
              onChange={handleChange}
            />
            {error.dob && <span>{error.dob}</span>}
        </div>

        <div>
            <input
              type="text"
              placeholder="Nationality"
              name="nationality"
              value={input.nationality}
              onChange={handleChange}
            />
        </div>

        <div>
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={input.description}
              onChange={handleChange}
            />
        </div>

        <div>
            <select
              name="teams"
              multiple
              value={selectedTeams}
              onChange={(e) => handleMultipleTeams(e.target.value)}
              >
              {teamsData.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
            {error.teams && <span>{error.teams}</span>}
            <div>
              <label>* </label>
            <strong>Selected Teams:</strong>
            {Array.isArray(selectedTeams) && selectedTeams.length > 0 && (
              <ul>
                {selectedTeams.map((team, index) => (
                  <li key={index}>
                <button onClick={() => handleMultipleTeams(team)}>x</button>
                  {team}
                  </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        <div>
            <input
              type="text"
              placeholder="Image"
              name="image"
              value={input.image}
              onChange={handleChange}
            />
            {error.image && <span>{error.image}</span>}
        </div>
          <p>* Fields are mandatory</p>
        <button type="submit">Create</button>
      </form>
      </div>
    </div>
  );
}

export default FormPage;