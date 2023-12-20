const {Driver, Team} = require ("../db");
const axios = require ("axios");
const fs = require('fs');
const path = require('path');
const sequelize = require ('sequelize')
const {
    CommonStructureToAll,
    StructureForID,
    StructureForName,
} = require ("./filters")

//Entrega todos los Drivers y estructura los datos
const AllDrivers = async ()=>{
    const infoDB = await Driver.findAll()
    const driversDB = CommonStructureToAll (infoDB);
    const infoAPI = (await axios.get ("http://localhost:5000/drivers")).data;
    const driversAPI = CommonStructureToAll (infoAPI);
    
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
    return StructureForID(source === 'api' ? driverFromId : driverFromId?.toJSON());
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
    const formattedDrivers = StructureForName(limitedDrivers);

    return formattedDrivers;
}

//Creación de Driver en DB
const createDriverDB = async (forename, surname, description, image, nationality, dob)=>{
    console.log('Creating driver on DB...');
    const driverCreated = await Driver.create ({forename, surname, description, image, nationality, dob});
    console.log('Created driver: ', driverCreated);
    return driverCreated;
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
    if (driver.teams) {
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