import {
    GET_ALL_CRYPTOS,
} from './actionTypes';

const initialState = {
    cryptos: [],
}

const reducer = ( state = initialState, {type, payload})=>{
    switch (type) {
        case GET_ALL_CRYPTOS:
            return {
                ...state,
                cryptos: payload,
            }
            default:
                return state;
    }
}

export default reducer;