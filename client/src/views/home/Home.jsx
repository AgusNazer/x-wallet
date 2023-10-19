import { useState, useEffect } from "react";
import axios from "axios";

// const apiKey = "CG-pnmcBPxpbvF1MNgVtB5HP5pS	"; 
// const apiUrl = `https://api.coingecko.com/api/v3/coins/list${apiKey}`;



function Home() {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [sortBy, setSortBy] = useState(""); // Estado para la opción de ordenamiento
  const [searchSymbol, setSearchSymbol] = useState(""); // Estado para la opción de ordenamiento


  useEffect(() => {
    const params = {
      vs_currency: 'usd',
      name: searchTerm, // Agrega el término de búsqueda como parámetro
      symbol: searchSymbol,
      sort_by: sortBy, // Agrega la opción de ordenamiento como parámetro
    }
    // Realizar la solicitud a la API cuando el componente se monte
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: params,
        headers: {
          "Content-Type": "application/json",
        //   "x-cg-pro-api-key": apiKey,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
      });
  }, [searchTerm, sortBy, searchSymbol]);

  // Función para agregar una criptomoneda a favoritos
  const addToFavorites = () => {
  
  };

  // Función para manejar la búsqueda
  const handleSearch = (e) => {
    e.preventDefault(); 
    // Realiza la solicitud a la API con el término de búsqueda actual (searchTerm)
    // setData(resultados); Actualiza el estado de data con los resultados
     // Realiza la solicitud a la API con el término de búsqueda actual (searchTerm)
  const params = {
    vs_currency: 'usd',
    name: searchTerm, 
    symbol: searchSymbol,
    order: sortBy, // También incluimos la opción de ordenamiento
  };

  axios.get('http://localhost:3000/allCryptos/search', {
    params: params,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      setData(response.data); // Actualiza el estado de data con los resultados
    })
    .catch((error) => {
      console.error("Error al hacer la solicitud:", error);
    });
  };


   // Función para manejar el cambio en la opción de ordenamiento
   const handleSortByChange = (e) => {
    const selectedOption = e.target.value;
    setSortBy(selectedOption); // Actualiza el estado sortBy con la opción seleccionada
  };

// Función para agregar una criptomoneda a favoritos en Firestore
// const handleAddToFavorites = () => {
  
// };

//   // Función para eliminar una criptomoneda de favoritos
//   const removeFromFavorites = () => {
  
//   };

  return (
    <div>
       <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar criptomoneda"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza searchTerm // Actualiza searchTerm
        />
        <input
          type="text"
          placeholder="Buscar criptomoneda por símbolo"
          value={searchSymbol}
          onChange={(e) => setSearchSymbol(e.target.value)} // Actualiza searchSymbol
        />
        <select
          value={sortBy}
          onChange={handleSortByChange} // Actualiza sortBy
        >
          <option value="">Ordenar por...</option>
          <option value="name">Nombre</option>
          <option value="market_cap">Market Cap</option>
          <option value="total_volume">Total Volume</option>
        </select>
        <button type="submit">Buscar</button>
      </form>
      <h2 className="text-xl">Precio actual de criptomonedas en USD:</h2>
      {data ? (
        <div className="border-2 p-6">
          {Object.keys(data).map((crypto) => (
            <div className="flex" key={crypto}>
              <div className="w-16 h-16 flex items-center justify-center">
              <button onClick={() => addToFavorites(crypto)}>⭐</button>
                <img
                  src={data[crypto].image}
                  alt={data[crypto].name}
                  className="w-16 h-16"
                />
              </div>
              <div className="ml-4">
                <div className="flex flex-col p-8">
                  <div className="table">
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th className="font-semibold border-2">Name</th>
                          <th className="font-semibold border-2">Símbol</th>
                          <th className="font-semibold border-2">Current Price</th>
                          <th className="font-semibold border-2">Market Cap</th>
                          <th className="font-semibold border-2">High 24h</th>
                          <th className="font-semibold border-2">Low 24h</th>
                          <th className="font-semibold border-2">Total volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td className="p-10 border-2">{data[crypto].name}</td>
                          <td className="p-10 border-2">{data[crypto].symbol}</td>
                          <td className="p-10 border-2">
                            {data[crypto].current_price} USD
                          </td>
                          <td className="p-10 border-2">{data[crypto].market_cap}</td>
                          <td className="p-10 border-2">{data[crypto].high_24h}</td>
                          <td className="p-10 border-2">{data[crypto].low_24h}</td>
                          <td className="p-10 border-2">{data[crypto].total_volume}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}

export default Home;
