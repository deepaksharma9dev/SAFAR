import { BUS_FOUND, BUS_NOTFOUND} from "../actions/types";

const initialState = {
    buses: [],
    loading: true
};


export default function(state = initialState, action){
    const {type,payload} = action
    switch(type){
        case BUS_FOUND:
            return{
                ...state,
                ...payload,
                loading: false
            };
        case BUS_NOTFOUND:
            return {
                ...state,
                loading:false
            };
        default:
            return state;
    }
}