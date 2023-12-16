const {
    getAllDrivers,
    getDriverByName, 
    getDriverById, 
    createDriverDB, 
    getTeam
} = require ("../controllers/driverControllers");

//Entrega todos los Drivers desde DB y API con manejo de errores
const getDriversHandler = async (req,res) =>{
    console.log('Searching drivers...');
    const {name} = req.query;
    try {
        let drivers;
        if (name){
            drivers = await getDriverByName(name)
        } else{
            drivers = await getAllDrivers()
        }  

        const simplified = drivers.map(driver => {
            return {
              name: driver.name, 
              image: driver.image
            }
          });
      
          res.status(200).json({
            msg: 'Founded drivers',
            data: simplified   
          });

    } catch (error) {
        console.error('Error while fetching drivers:', error);
        res.status(500).json({error:error.message});
    }
    console.log('Finding drivers and returned...');
};

//Busca Driver en DB y API según primer nombre con manejo de errores
const getNameHandler = async (req, res) => {
    console.log('Searching drivers by name...');
    const { forename } = req.query;
    try {
        const drivers = await getDriverByName(forename);

        const simplified = drivers.map(driver => ({
            name: driver.forename,
            lastname: driver.surname,
            image: driver.image
        }));

        if (drivers.length === 0) {
            res.status(404).json({
                msg: `We didn't found the driver named: ${forename}`,
                data: [] 
            });
        } else {
            res.status(200).json({
                msg: `Drivers found with name: ${forename}`,
                data: simplified
        });
    }
    } catch (error) {
        console.error('Error while fetching drivers by name:', error);
        res.status(500).json({ error: error.message });
    }
    console.log('Search for drivers by name completed...');
};

//Busca Driver en DB y API según ID con manejo de errores
const getIdHandler = async (req,res) =>{
    const {id} = req.params;
    const source = isNaN(id) ? "bdd" : "api";
    try {
        const detailDriver = await getDriverById(id,source)
        res.status(200).json({
            msg: `Here you got the detail from the driver's id: ${id}`,
            data: detailDriver
        });
    } catch (error) {
        console.error('Error while fetching driver details:', error);
        res.status(500).json({error:error.message});
    }
};

//Creación de Driver en DB con manejo de errores
const createDriverHandler = async (req,res) =>{
    console.log('Request for driver creation');
    const {forename, surname, description, image, nationality, dob} = req.body;
    try{
        const newDriver = await createDriverDB (forename, surname, description, image, nationality, dob);
        res.status(200).json({
            msg: `${forename} ${surname} was created as a new driver`,
            data: newDriver
        });
    } catch (error){
        console.error('Error while creating driver:', error);
        res.status(500).json({error:error.message});
    }
    console.log('Driver created successfully');
};

//ARREGLAR
const getTeamsHandler = async (req, res) => {
    console.log('Fetching teams...');
    try {
        await getTeam();
        const teams = await Team.findAll();
        if (teams.length > 0) {
            res.status(200).json({
            msg: 'Teams founded',
            data: teams,
          });
        } else {
            res.status(404).json({
              msg: 'No teams found',
              data: [],
            });
          }
        } catch (error) {
          console.error('Error while fetching teams:', error);
          res.status(500).json({ error: 'Failed to fetch or save teams' });
        }
      };

module.exports={
    getDriversHandler,
    getNameHandler,
    getIdHandler,
    createDriverHandler,
    getTeamsHandler
}