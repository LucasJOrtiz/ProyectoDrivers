const {
    getAllDrivers,
    getDriverById, 
    getDriverByName, 
    createDriverDB, 
    getTeam
} = require ("../controllers/driverControllers");

//Entrega TODOS los drivers y maneja errores
const getDriversHandler = async (req,res) =>{
    console.log('Searching drivers...');

    try {
        const drivers = await getAllDrivers()
        
          res.status(200).json({
            msg: 'Founded drivers',
            data: drivers   
          });

    } catch (error) {
        console.error('Error while fetching drivers:', error);
        res.status(500).json({error:error.message});
    }
    console.log('Finding drivers and returned...');
};

//Busca Driver según ID y maneja de errores
const getIdHandler = async (req,res) =>{
    const {id} = req.params;
    const source = isNaN(id) ? "db" : "api";
    try {
        const detailDriver = await getDriverById(id,source)
        res.status(200).json({
            msg: `Detail from the id: ${id}`,
            data: detailDriver
        });
    } catch (error) {
        console.error('Error while fetching driver details:', error);
        res.status(500).json({error:error.message});
    }
};

//Busca Driver en DB y API según primer nombre con manejo de errores
const getNameHandler = async (req,res) =>{
    console.log('Searching drivers...');
    const {name} = req.query;
    try {
        let drivers;
        if (name){
            drivers = await getDriverByName(name)
            res.status(200).json({
              msg: 'Founded drivers',
              drivers
            });

        } else{
        res.status(404).json({
            msg: `No drivers found with name: ${forename}`,
            data: [] 
        }) 
      }
     } catch (error) {
        console.error('Error while fetching drivers:', error);
        res.status(500).json({error:error.message});
    }
    console.log('Finding drivers and returned...');
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
    getIdHandler,
    getNameHandler,
    createDriverHandler,
    getTeamsHandler
}