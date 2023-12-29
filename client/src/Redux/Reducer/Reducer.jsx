import { GET_DRIVERS, GET_BY_NAME, GET_BY_ID } from "../Actions/Actions";

let initialState = {
    allDrivers:[], 
    driversCopy:[], 
    createDriver:[], 
    driverDetails: {}
};

function rootReducer(state= initialState, action){
    switch(action.type){
        case GET_DRIVERS:
            return{
                ...state,
                allDrivers:[...action.payload],
                driversCopy:[...action.payload]
            };
        case GET_BY_NAME:
            return{
                ...state,
                allDrivers:[...action.payload],
            };
        case GET_BY_ID:
            return{
                ...state,
                driverDetails:action.payload,
            };

        default:
            return state
        }
}

export default rootReducer