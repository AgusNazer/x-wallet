import {
  GET_ALL_CRYPTOS,
  SEARCH_CRYPTOCURRENCIESDB,
  GET_DETAIL_CRYPTO,
  SORT_BY_NAME,
  ADD_TO_FAVORITES,
} from "./actionTypes";

const initialState = {
  cryptos: [],
  favorites:[]
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_CRYPTOS:
      return {
        ...state,
        cryptos: payload,
      };
    case SEARCH_CRYPTOCURRENCIESDB:
      return {
        ...state,
        cryptos: payload, // Actualiza el estado con las criptomonedas encontradas
      };
      case SORT_BY_NAME:
      return {
        ...state,
        cryptos: payload, // Actualiza el estado con las criptomonedas ordenadas
      };
      
    case GET_DETAIL_CRYPTO:
      console.log("Detalles recibidos:", payload);
      return {
        ...state,
        detailCrypto: payload,
      };
      case ADD_TO_FAVORITES:
        console.log("Detalles recibidos:", payload);
        return {
          ...state,
          favorites: [...state.favorites, payload],
        };
      
    default:
      return state;
  }
};

export default reducer;
