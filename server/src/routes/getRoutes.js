const { Router } = require("express");
const getRoutes = Router();

const { 
    getDriversHandler, 
    getNameHandler,
    getIdHandler,
    getTeamsHandler
 } = require ("../handlers/driverHandlers")

getRoutes.get ("/drivers", getDriversHandler);

getRoutes.get ("/drivers/name", getNameHandler);

getRoutes.get ("/drivers/:idDriver", getIdHandler);

getRoutes.get ("/teams", getTeamsHandler);

module.exports = getRoutes;