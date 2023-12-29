import axios from "axios"

export const GET_DRIVERS = "GET_DRIVERS"
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_BY_ID = "GET_BY_ID"

export function getDrivers(){
    return async function (dispatch){
        try {
            const response = await axios("http://localhost:3001/drivers"); 

            const driversWithCorrectedTeams = response.data.data.map(driver => {
                if (typeof driver.teams === 'string') {
                  driver.teams = driver.teams.split(',').join(', ');
                }
                return driver;
              });

            return dispatch({
                type: "GET_DRIVERS",
                payload: driversWithCorrectedTeams, 
            });
        } catch (error) {
            console.error('Error founding all drivers on front:', error);
            throw error;
        }
    }
}

export function getByName(name){
    return async function (dispatch){
        try {
            const response = await axios(`http://localhost:3001/name?name=${name}`); 
            
            if (response.data.drivers && Array.isArray(response.data.drivers)) {
            return dispatch({
                type: "GET_BY_NAME",
                payload: response.data.drivers, 
            });
        } else {
            console.error('Driver name not found:', response.data);
            return dispatch({
              type: "GET_BY_NAME",
              payload: [],
            });
          }
        } catch (error) {
            console.error('Error founding name driver on front:', error);
            throw error;
        }
    }
}

export function getById(id){
    return async function (dispatch){
        try {
            const response = await axios(` http://localhost:3001/drivers/${id}`); 
            
            if (response.data && Object.keys(response.data).length !== 0) {
            return dispatch({
                type: "GET_BY_ID",
                payload: response.data, 
            });
        } else {
            console.error('Can not read id', response.data);
            return dispatch({
              type: "GET_BY_ID",
              payload: {},
            });
          }
        } catch (error) {
            console.error('Error founding id driver on front:', error);
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