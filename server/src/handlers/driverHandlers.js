const {createDriverDB} = require ("../controllers/driverControllers");

const getDriverHandler = (req,res) =>{
    const {name} = req.query;
    if (name) res.status(200).send (`Here you got the driver named: ${name}`);
    res.status(200).send(`Here you got all the drivers`)
};

const getDetailHandler = (req,res) =>{
    const {id} = req.params;
    res.status(200).send(`Here you got the detail from driver's id: ${id}`)
};

const createDriverHandler = async (req,res) =>{
    const {firstName, lastName, description, image, nationality, birthDate} = req.body;
    try{
        const newDriver = await createDriverDB (firstName, lastName, description, image, nationality, birthDate);
        res.status(200).json({
            msg: `${firstName} was created as a new driver`,
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