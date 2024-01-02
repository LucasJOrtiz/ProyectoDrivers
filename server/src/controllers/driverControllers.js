const axios = require ("axios");
const fs = require('fs');
const path = require('path');
const sequelize = require ('sequelize')

const {Driver, Team} = require ("../db");
const CommonStructureToAll = (drivers) => {
  if (!Array.isArray(drivers)) {
    return {
      id: drivers.id || null,
      forename: drivers.forename || drivers.name.forename || null,
      surname: drivers.surname || drivers.name.surname || null,
      teams: drivers.teams || [],
      dob: drivers.dob || null,
      nationality: drivers.nationality || null,
      description: drivers.description || null,
      image: drivers.image?.url || drivers.image || null,
      created: drivers.created !== undefined ? drivers.created : false,
    };
  } else {
    return drivers.map((driver) => {
      return {
        id: driver.id || null,
        forename: driver.forename || driver.name.forename || null,
        surname: driver.surname || driver.name.surname || null,
        teams: driver.teams || [],
        dob: driver.dob || null,
        nationality: driver.nationality || null,
        description: driver.description || null,
        image: driver.image?.url || driver.image || null,
        created: driver.created !== undefined ? driver.created : false,
      };
    });
  }
};

//Entrega todos los Drivers y estructura los datos
const AllDrivers = async ()=>{
    const infoDB = await Driver.findAll()
    const driversDB = CommonStructureToAll (infoDB);
    const infoAPI = (await axios.get ("http://localhost:5000/drivers")).data;
    const driversAPI = CommonStructureToAll (infoAPI).map(driver => {
      if (typeof driver.teams === 'string') {
        driver.teams = driver.teams.split(',').join(', ');
      }
      return driver;
  });
    
    return [...driversDB, ...driversAPI]
}

//Busca Driver en DB y API según ID
const DriverById = async (id, source) =>{
    console.log(`Looking for driver ID ${id} on ${source}`);
    let driverFromId;

  if (source === 'api') {
    const response = await axios.get(`http://localhost:5000/drivers/${id}`);
    driverFromId = response.data;
  } else {
    driverFromId = await Driver.findByPk(id, { include: Team });
  }

    console.log('Founded driver: ', driverFromId);
    return CommonStructureToAll(source === 'api' ? driverFromId : driverFromId?.toJSON());
}

//Busca Driver en DB y API según primer nombre
const DriverByName = async (forename)=>{
    const DBdrivers = await Driver.findAll({
        where: sequelize.where(sequelize.fn('lower', sequelize.col('forename')), sequelize.fn('lower', forename)),
        include: Team,
    });
    
    const capsQuery = (forename.charAt(0).toUpperCase() + forename.slice(1).toLowerCase());
    const APIdrivers = (await axios.get (`http://localhost:5000/drivers?name.forename=${capsQuery}`)).data;
    
    const combinedDrivers = [...DBdrivers, ...APIdrivers]
    const uniqueDrivers = combinedDrivers.filter((driver, index, self) =>
            index === self.findIndex((d) => (d.id === driver.id)));
    const limitedDrivers = uniqueDrivers.slice(0, 15);
    const formattedDrivers = CommonStructureToAll(limitedDrivers);

    return formattedDrivers;
}

//Relación Driver-Team y Creación de Driver en DB
const existingDriverDB = async (forename, surname) => {
  const existingDriver = await Driver.findOne({ where: { forename, surname } });
  return !!existingDriver;
};

const existingDriverAPI = async (forename, surname) => {
  const response = await axios.get('http://localhost:5000/drivers');
  const driversData = response.data && response.data.data;

    if (driversData && driversData.length > 0) {
      const foundDriver = driversData.find(driver => driver.name.forename === forename && driver.name.surname === surname);
      return !!foundDriver;
    }

    return false;
  }

const createDriverDB = async (forename, surname, description, image, nationality, dob, teams)=>{
    console.log('Creating driver on DB...');
    
    const isDriverInAPI = await existingDriverAPI(forename, surname);
  
    if (isDriverInAPI) {
      throw new Error('Driver already exists in the API');
    }

    const isDriverInDB = await existingDriverDB(forename, surname);

    if (isDriverInDB) {
      throw new Error('Driver already exists in DB');
    }

    const driverData = {
      forename,
      ...(surname && { surname }),
      ...(description && { description }),
      ...(image && { image }),
      ...(nationality && { nationality }),
      ...(dob && { dob }),
  };

    const driverCreated = await Driver.create(driverData);

    const formatTeamName = (name) => {
      return name.toLowerCase().split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  if (!teams) {
    console.log('No teams provided for the driver');
  } else {
    let teamNames = [];
  if (typeof teams === 'string') {
    teamNames = teams.split(',').map(team => team.trim());
  } else if (Array.isArray(teams)) {
    teamNames = teams;
  } else {
    throw new Error('The value of teams is not valid');
  }

    const teamIds = [];

    for (const teamName of teamNames) {
        const formattedTeamName = formatTeamName(teamName);
        const team = await Team.findOne({ where: { name: formattedTeamName } });
        if (team) {
            teamIds.push(team.id);
        } else {
            throw new Error(`The team "${teamName}" does not exist in the database`);
        }
    }

    await driverCreated.setTeams(teamIds);
} 

const driverTeams = await driverCreated.getTeams();

const driverResponse = {
  id: driverCreated.id,
  created: true,
  forename: driverCreated.forename,
  surname: driverCreated.surname,
  description: driverCreated.description,
  image: driverCreated.image,
  nationality: driverCreated.nationality,
  dob: driverCreated.dob,
  teams: driverTeams.map(team => ({
    id: team.id,
    name: team.name
  }))
};

console.log(`Created driver: ${driverData.forename} ${driverData.surname}`);
return { data: driverData };
};

//Ubicación, mapeo y formateo de teams
const AllTeamsFromAPI = () => {
  const filePath = path.join(__dirname, '..', '..', 'api', 'db.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(data);
  
  if (!jsonData || !jsonData.drivers) {
    throw new Error('Unable to retrieve information from the API');
  }

  const drivers = jsonData.drivers;

  console.log('Looking for Teams in API...');
  let teamsArray = [];

  drivers.forEach(driver => {
    if (typeof driver.teams === 'string') {
      const teams = driver.teams.split(',').map(team => team.trim());
      teamsArray = teamsArray.concat(teams);
    }
  });

  const formattedTeams = teamsArray.map(team => {
    return team.includes(' ')
      ? team.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
      : team.charAt(0).toUpperCase() + team.slice(1).toLowerCase();
  });

  const uniqueTeams = [...new Set(formattedTeams)];
  const sortedTeams = uniqueTeams.sort();

  console.log('Teams found: ', sortedTeams);
  console.log(`There are ${sortedTeams.length} teams in total.`);
  
  return sortedTeams;
};

//Guardado de teams en DB
const saveTeamsToDatabase = async (teams) => {
  const existingTeams = await Team.findAll();

  if (existingTeams.length === 0) {
    await Team.bulkCreate(teams.map(name => ({ name })));
  } else {
    const existingTeamNames = existingTeams.map(team => team.name.toLowerCase());
    const newTeamNames = teams.map(name => name.toLowerCase());
    const missingTeams = newTeamNames.filter(name => !existingTeamNames.includes(name));
    missingTeams.sort();

    if (missingTeams.length > 0) {
      await Team.bulkCreate(missingTeams.map(name => ({ name: name.charAt(0).toUpperCase() + name.slice(1) })));
    }
  }
};

module.exports={
    AllDrivers,
    DriverById,
    DriverByName,
    createDriverDB,
    AllTeamsFromAPI,
    saveTeamsToDatabase
};