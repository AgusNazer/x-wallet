import axios from 'axios';
import {
    GET_ALL_CRYPTOS,
    SEARCH_CRYPTOCURRENCIESDB,
    GET_DETAIL_CRYPTO,
} from './actionTypes'

// Acción para obtener y guardar criptomonedas
export function getAllCryptos(name) {
    return async function (dispatch) {
      try {
        // Realiza una solicitud al controlador getAllCryptos en tu backend
        const response = await axios.get('http://localhost:3000/allCryptos', {
          params: { name },
        });
  
        // Verifica si la respuesta contiene datos válidos
        if (response.data && Array.isArray(response.data)) {
          // Envía los datos al reductor
          dispatch({
            type: GET_ALL_CRYPTOS,
            payload: response.data,
          });
        } else {
          console.error('Respuesta de API inesperada:', response.data);
        }
      } catch (error) {
        console.error('Error al obtener criptomonedas desde la API:', error);
      }
    };
  }

  // Acción para buscar criptomonedas por nombre o símbolo en la base de datos
  export function searchCryptocurrenciesDB(name, symbol) {
    console.log('Dispatching searchCryptocurrenciesDB action');
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`/search?name=${name}&symbol=${symbol}`);
            
            // Si la búsqueda fue exitosa, establece el error en null
       
            return dispatch({
                type: SEARCH_CRYPTOCURRENCIESDB,
                payload: data,
            });
        } catch (error) {
          console.log('No se encontraron resultados', error);
            // dispatch(setError(error.message));
        }
    };
}


export function getDetailCrypto(id) {
  return async function(dispatch){
    console.log(`a ver si llega el id aca, id:`);
    try {
      const { data } = await axios.get(`/detail/${id}`)
      return dispatch({
        type: GET_DETAIL_CRYPTO,
        payload: data,
      })
    } catch (error) {
      console.log('No se encontraron los detalles', error);
    }
  }
}