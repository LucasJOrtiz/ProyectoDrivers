const {driver} = require ("../db");

const createDriverDB = async (firstName, lastName, description, image, nationality, birthDate)=>{
    return await driver.create ({firstName, lastName, description, image, nationality, birthDate});
};

module.exports={
    createDriverDB
};