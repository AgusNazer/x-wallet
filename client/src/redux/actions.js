import axios from 'axios';
import {
    GET_ALL_CRYPTOS,
    SEARCH_CRYPTOCURRENCIESDB,
    GET_DETAIL_CRYPTO,
    SORT_BY_NAME,
    ADD_TO_FAVORITES
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
    console.log(`a ver si llega el id aca, id:${id}`);
    try {
      const  response  = await axios.get(`http://localhost:3000/detail/${id}`)
      const details = response.data

      console.log(`id del axios.get ${id}`);
      return dispatch({
        type: GET_DETAIL_CRYPTO,
        payload: details,
      })
    } catch (error) {
      console.log('No se encontraron los detalles', error);
    }
  }
}



// Acción para ordenar las criptomonedas por nombre
// export const sortByName = () => async (dispatch) => {
//   dispatch({ type: SORT_BY_NAME });

//   try {
//     const response = await axios.get('http://localhost:3000/sortByName'); // Ajusta la URL según tu configuración de rutas
//     const sortedCryptos = response.data;

//     dispatch({
//       type: SORT_BY_NAME,
//       payload: sortedCryptos,
//     });
//   } catch (error) {
//     dispatch({
//       type: SORT_BY_NAME,
//       payload: error.response.data,
//     });
//   }
// };
export const sortByName = (order) => async (dispatch, getState) => {
  dispatch({ type: SORT_BY_NAME });

  const { cryptos } = getState(); // Obtén el estado actual de las criptomonedas

  let sortedCryptos = [...cryptos]; // Crea una copia de las criptomonedas para no modificar el estado original

  sortedCryptos.sort((a, b) => {
    if (order === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (order === 'desc') {
      return b.name.localeCompare(a.name);
    }
  });

  dispatch({
    type: SORT_BY_NAME,
    payload: sortedCryptos,
  });
};



export const addToFavorites = (crypto) => {
  return (dispatch, getState) => {
    // Verificar si la criptomoneda ya está en favoritos para evitar duplicados
    const { favorites } = getState();
    const isAlreadyInFavorites = favorites.some((favorite) => favorite.id === crypto.id);

    if (isAlreadyInFavorites) {
      // Puedes manejar esto de alguna manera, como mostrar un mensaje de error
      console.log('La criptomoneda ya está en favoritos');
    } else {
      // Si no está en favoritos, agrega la criptomoneda a la lista
      dispatch({
        type: ADD_TO_FAVORITES,
        payload: crypto,
      });
    }
  };
};