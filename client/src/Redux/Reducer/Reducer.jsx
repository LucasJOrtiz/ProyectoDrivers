import { GET_DRIVERS, GET_BY_NAME } from "../Actions/Actions";

let initialState = {allDrivers:[], driversCopy:[], createDriver:[]};

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

        default:
            return state
        }
}

export default rootReducer