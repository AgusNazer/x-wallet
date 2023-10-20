import axios from 'axios';
import {
    GET_ALL_CRYPTOS
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

