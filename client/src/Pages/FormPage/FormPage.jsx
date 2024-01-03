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
      return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedTeams = input.teams.join(', ');
    const updatedInput = {
      ...input,
      teams: formattedTeams,
    };
  
    setInput(updatedInput);
  
    if (validateForm()) {
      try {
        await dispatch(createDriver(updatedInput));
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
        setBackendError('This Driver already exists in DB');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

      setInput({
        ...input,
        [name]: value,
      });
  };

  const handleTeamChange = (e) => {
    const selectedTeams = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);

      setInput((prevInput) => ({
        ...prevInput,
        teams: [...prevInput.teams, ...selectedTeams],
      }));
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
              value={input.teams}
              onChange={handleTeamChange}
              >
              {teamsData.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
            {error.teams && <span>{error.teams}</span>}
            <div>
              <label>* </label>
            <strong>Selected Teams:</strong>
            {Array.isArray(input.teams) && (
              <ul>
                {input.teams.map((team, index) => (
                  <li key={index}>{team}</li>
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