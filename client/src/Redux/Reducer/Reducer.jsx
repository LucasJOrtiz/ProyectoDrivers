import { GET_DRIVERS } from "../Actions/Actions";

let initialState = {allMyDrivers:[]};

function rootReducer(state= initialState, action){
    switch(action.type){
        case GET_DRIVERS:
            return{
                ...state,
                allMyDrivers:[...action.payload],
            }
        default:
            return state
    }
}

export default rootReducer