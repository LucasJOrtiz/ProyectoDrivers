const {Driver, Team} = require ("../db");
const axios = require ("axios");

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
        where: {name: name},
        include: Team
    });
    const APIinfo = (await axios.get ("cr-pi-drivers-main\server\api\db.json")).data;
    const APIdrivers = infoCleaner (APIinfo);
    const driverFilter = APIdrivers.filter (driverArr=> drivers.name=== name);

    return [...DBdrivers, ...driverFilter]
}


module.exports={
    createDriverDB,
    getDriverById,
    getDriverByName,
    getAllDrivers
};