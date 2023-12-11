const {
    createDriverDB, 
    getDriverById, 
    getDriverByName, 
    getAllDrivers
} = require ("../controllers/driverControllers");

const getDriverHandler = async (req,res) =>{
    const {name} = req.query;
    try {
        if (name){
            const nameDriver = await getDriverByName(name)
            res.status(200).json({
                msg: `Here you got the driver named: ${name}`,
                data: nameDriver
            });
        } else{
            const driversNames = await getAllDrivers()
            res.status(200).json({
                msg: `Here you got all the drivers`,
                data: driversNames
            });
        }  
    } catch (error) {
        res.status(500).json({error:error.message});
    }
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
        res.status(500).json({error:error.message});
    }
};

const createDriverHandler = async (req,res) =>{
    const {name, description, image, nationality, dob} = req.body;
    try{
        const newDriver = await createDriverDB (name, description, image, nationality, dob);
        res.status(200).json({
            msg: `${name} was created as a new driver`,
            data: newDriver
        });
    } catch (error){
        res.status(500).json({error:error.message});
    }
};

module.exports={
    getDriverHandler,
    getDetailHandler,
    createDriverHandler
}