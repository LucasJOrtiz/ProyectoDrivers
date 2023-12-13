const {Driver, Team} = require ("../db");
const axios = require ("axios");
const fs = require('fs');
const path = require('path');

//--------------------------------------------------------------------
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
//--------------------------------------------------------------------

const createDriverDB = async (name, description, image, nationality, dob)=>{
    console.log('Creating driver on DB...');
    const driverCreated = await Driver.create ({name, description, image, nationality, dob});
    console.log('Created driver: ', driverCreated);
    return driverCreated;
};

const getDriverById = async (id, source) =>{
    console.log(`Looking for driver ID ${id} on ${source}`);
    const driverFromId = source === "api" ?
    (await axios.get (`cr-pi-drivers-main\server\api\db.json/${id}`)).data :
    await Driver.findByPk(id, {include: Team});
    console.log('Founded driver: ', driverFromId);
    
    return getDetailData (driverFromId);
}

const getAllDrivers = async ()=>{
    const driversDB = await Driver.findAll()
    const infoAPI = (await axios.get ("cr-pi-drivers-main\server\api\db.json")).data;
    const driversAPI = infoCleaner (infoAPI);

    return [...driversDB, ...driversAPI]
}

const getDriverByName = async (name)=>{
    const DBdrivers = await Driver.findAll({
        where: sequelize.where(sequelize.fn('lower', sequelize.col('name')), sequelize.fn('lower', name)),
        include: Team,
        limit: 15
    });
    const APIinfo = (await axios.get ("cr-pi-drivers-main\server\api\db.json")).data;
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

const getTeam = async () => {
    const dbPath = path.join(__dirname, 'server\api\db.json'); 
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
    createDriverDB,
    getDriverById,
    getDriverByName,
    getAllDrivers,
    getTeam
};