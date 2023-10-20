import {
    GET_ALL_CRYPTOS,
    SEARCH_CRYPTOCURRENCIESDB,
    GET_DETAIL_CRYPTO,
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
            case SEARCH_CRYPTOCURRENCIESDB:
            return {
                ...state,
                cryptos: payload, // Actualiza el estado con las criptomonedas encontradas
            }
            case GET_DETAIL_CRYPTO:
                return {
                    ...state,
                    cryptos: payload, 
                }
            default:
                return state;
    }
}

export default reducer;