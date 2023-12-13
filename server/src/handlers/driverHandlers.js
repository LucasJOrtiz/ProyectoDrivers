const {
    createDriverDB, 
    getDriverById, 
    getDriverByName, 
    getAllDrivers
} = require ("../controllers/driverControllers");

const getDriverHandler = async (req,res) =>{
    console.log('Searching drivers...');
    const {name} = req.query;
    try {
        let drivers;
        if (name){
            drivers = await getDriverByName(name)
            // const nameDriver = await getDriverByName(name)
            // res.status(200).json({
            //     msg: `Here you got the driver named: ${name}`,
            //     data: nameDriver
            // });
        } else{
            drivers = await getAllDrivers()
            // const driversNames = await getAllDrivers()
            // res.status(200).json({
            //     msg: `Here you got all the drivers`,
            //     data: driversNames
            // });
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
    console.log('Finding driver and returned...');
};

const getDetailHandler = async (req,res) =>{
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

const createDriverHandler = async (req,res) =>{
    console.log('Request for driver creation');
    const {name, description, image, nationality, dob} = req.body;
    try{
        const newDriver = await createDriverDB (name, description, image, nationality, dob);
        res.status(200).json({
            msg: `${name} was created as a new driver`,
            data: newDriver
        });
    } catch (error){
        console.error('Error while creating driver:', error);
        res.status(500).json({error:error.message});
    }
    console.log('Driver created successfully');
};

module.exports={
    getDriverHandler,
    getDetailHandler,
    createDriverHandler
}