const CommonStructureToAll = (drivers) => {
    return drivers.map(driver => {
        return {
            ID: driver.id || null,
            Name: driver.forename || driver.name.forename || null,
            Lastname: driver.surname || driver.name.surname || null,
            Teams: driver.teams || [],
            Date_of_birdth: driver.dob || null,
            Nationality: driver.nationality || null,
            Description: driver.description || null,
            Image_url: driver.image?.url || driver.image || null,
            From_DB: driver.created !== undefined ? driver.created : false,
        };
    });
};

const StructureForID = (driver) => {
    return {
        ID: driver.id || null,
        Name: driver.forename || driver.name.forename || null,
        Lastname: driver.surname || driver.name.surname || null,
        Teams: driver.teams || [],
        Image_url: driver.image?.url || driver.image || null,
    } 
}

const StructureForName = (drivers) => {
    return drivers.map(driver => {
        return {
            Name: driver.forename || driver.name.forename || null,
            Lastname: driver.surname || driver.name.surname || null,
            Description: driver.description || null,
            Image_url: driver.image?.url || driver.image || null,
        };
    });
};

module.exports = {
    CommonStructureToAll,
    StructureForID,
    StructureForName,
};