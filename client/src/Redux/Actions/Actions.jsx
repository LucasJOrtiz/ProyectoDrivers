import axios from "axios"

export const GET_DRIVERS = "GET_DRIVERS"

export function getDrivers(){
    return async function (dispatch){
        try {
            const response = await axios("http://localhost:3001/drivers"); 

            const driversWithCorrectedTeams = response.data.data.map(driver => {
                if (driver.teams) {
                  driver.teams = driver.teams.split(',').join(', ');
                }
                return driver;
              });

            return dispatch({
                type: "GET_DRIVERS",
                payload: driversWithCorrectedTeams, 
            });
        } catch (error) {
            console.error('Error fetching drivers on front:', error);
            throw error;
        }
    }
}

export const createDriver = async (driverData) => {
    try {
        const response = await axios.post('http://localhost:5000/drivers', driverData);
        return response.data;
    } catch (error) {
        console.error('Error creating driver:', error);
    throw error;
  }
};