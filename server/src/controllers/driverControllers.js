const {Driver, Team} = require ("../db");
const axios = require ("axios");
const fs = require('fs');
const path = require('path');
const sequelize = require ('sequelize')

//Filtros
const infoCleaner = (array)=> {
    return array.map ((drivers)=>{
    return {
        name: drivers.name,
        image: drivers.image,
        teams: drivers.teams,
        description: drivers.description,
        created: false,
    }
});
};

const getDetailData = (driver) => {
    return {
      id: driver.id,
      name: driver.name,
      nationality: driver.nationality,
      teams: driver.teams 
    } 
}

//Entrega todos los Drivers desde DB y API
const getAllDrivers = async ()=>{
    const driversDB = await Driver.findAll()
    const infoAPI = (await axios.get ("http://localhost:5000/drivers")).data;
    const driversAPI = infoCleaner (infoAPI);
    
    return [...driversDB, ...driversAPI]
}

//Busca Driver en DB y API según primer nombre
const getDriverByName = async (forename)=>{
    const DBdrivers = await Driver.findAll({
        where: sequelize.where(sequelize.fn('lower', sequelize.col('forename')), sequelize.fn('lower', forename)),
        include: Team,
        limit: 15
    });
    const APIinfo = (await axios.get (`http://localhost:5000/drivers?name.forename=${forename}`)).data;
    const APIdrivers = infoCleaner (APIinfo).slice(0, 15);
    
    const combinedDrivers = [...DBdrivers, ...APIdrivers]
    const uniqueDrivers = combinedDrivers.filter((driver, index, self) =>
            index === self.findIndex((d) => (
                d.id === driver.id
                ))
        );

        const limitedDrivers = uniqueDrivers.slice(0, 15);
        return limitedDrivers;
}

//Busca Driver en DB y API según ID
const getDriverById = async (id, source) =>{
    console.log(`Looking for driver ID ${id} on ${source}`);
    const driverFromId = source === "api" ?
    (await axios.get (`http://localhost:5000/drivers/:{id}`)).data :
    await Driver.findByPk(id, {include: Team});
    console.log('Founded driver: ', driverFromId);
    
    return getDetailData (driverFromId);
}

//Creación de Driver en DB
const createDriverDB = async (forename, surname, description, image, nationality, dob)=>{
    console.log('Creating driver on DB...');
    const driverCreated = await Driver.create ({forename, surname, description, image, nationality, dob});
    console.log('Created driver: ', driverCreated);
    return driverCreated;
};

//ARREGLAR
const getTeam = async () => {
    const dbPath = path.join(__dirname, 'http://localhost:5000/drivers'); 
        if (fs.existsSync(dbPath)) {
            const jsonData = fs.readFileSync(dbPath, 'utf-8');
            const data = JSON.parse(jsonData);
            if (data.teams && data.teams.length > 0) {
                const savedTeams = data.teams;
                const dbTeams = await Team.findAll();
                if (dbTeams.length === 0) {
                    savedTeams.forEach(async (team) => {
                        await Team.create({
                            name: team.name,
                        });
                    });
                  }
                }
              }
            }

module.exports={
    getAllDrivers,
    getDriverByName,
    getDriverById,
    createDriverDB,
    getTeam
};