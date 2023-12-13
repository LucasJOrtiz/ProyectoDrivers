const { Router } = require("express");
const getRoutes = Router();

const { 
    getDriverHandler, 
    getDetailHandler,
    getNameHandler,
    getTeamsHandler
 } = require ("../handlers/driverHandlers")

getRoutes.get ("/drivers", getDriverHandler);

getRoutes.get ("/drivers/:idDriver", getDetailHandler);

getRoutes.get ("/drivers/name", getNameHandler);

getRoutes.get ("/teams", getTeamsHandler);

module.exports = getRoutes;