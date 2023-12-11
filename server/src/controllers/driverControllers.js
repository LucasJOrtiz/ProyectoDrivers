const {Driver} = require ("../db");
const {axios} = require ("axios");

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
//--------------------------------------------------------------------

const createDriverDB = async (name, description, image, nationality, dob)=>{
    return await Driver.create ({name, description, image, nationality, dob});
};

const getDriverById = async (id, source) =>{
    const driverFromId = source === "api" ?
    (await axios.get (`cr-pi-drivers-main\server\api\db.json/${id}`)).data :
    await Driver.findByPk(id);
    
    return driverFromId
}

const getAllDrivers = async ()=>{
    const driversDB = await Driver.findAll()
    const infoAPI = (await axios.get ("cr-pi-drivers-main\server\api\db.json")).data;
    const driversAPI = infoCleaner (infoAPI);

    return [...driversDB, ...driversAPI]
}

const getDriverByName = async (name)=>{
    const DBdrivers = await Driver.findAll({where: {name: name}});
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