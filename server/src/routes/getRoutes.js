const { Router } = require("express");
const getRoutes = Router();

const { getDriverHandler, getDetailHandler } = require ("../handlers/driverHandlers")

getRoutes.get ("/drivers", getDriverHandler);

getRoutes.get ("/drivers/:idDriver", getDetailHandler);

getRoutes.get ("/drivers?name=", (req,res)=>{
    res.status(200).send("Here you got related drivers")
});

getRoutes.get ("/teams", (req,res)=>{
    res.status(200).send("Here you got all the teams")
});

module.exports = getRoutes;