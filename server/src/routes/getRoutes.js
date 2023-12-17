const { Router } = require("express");
const getRoutes = Router();

const { 
    getDriversHandler, 
    getIdHandler,
    getNameHandler,
    getTeamsHandler
 } = require ("../handlers/driverHandlers")

getRoutes.get ("/drivers", getDriversHandler);

getRoutes.get ("/drivers/:id", getIdHandler);

getRoutes.get ("/name", getNameHandler);

getRoutes.get ("/teams", getTeamsHandler);

module.exports = getRoutes;