import axios from "axios"

export const GET_DRIVERS = "GET_DRIVERS"

export function getDrivers(){
    return async function (dispatch){
        const response = await axios ("http://localhost:5000/drivers");
        return dispatch({
            type: "GET_DRIVERS",
            payload: [...response.data],
        })
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