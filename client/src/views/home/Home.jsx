import { useState, useEffect } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { getAllCryptos,searchCryptocurrenciesDB } from "../../redux/actions";
import { Link } from "react-router-dom";


function Home() {

  const dispatch = useDispatch()
  const cryptos = useSelector((state) => state.cryptos);
  const [searchQuery, setSearchQuery] = useState(""); // Estado para el campo de búsqueda
  const [filteredCryptos, setFilteredCryptos] = useState([]);


  useEffect(() => {
  dispatch(getAllCryptos());
  setFilteredCryptos(cryptos)

}, [dispatch, cryptos]);

// Función para manejar cambios en el campo de búsqueda
const handleSearchChange = (event) => {
  const query = event.target.value;
  setSearchQuery(query);
  // Llama a la acción de búsqueda con el nombre y símbolo como parámetros
  dispatch(searchCryptocurrenciesDB(query, query));

  const filtered = cryptos.filter((crypto) => {
    return crypto.name.toLowerCase().includes(query.toLowerCase()) || crypto.symbol.toLowerCase().includes(query.toLowerCase());
  });

  setFilteredCryptos(filtered);
};
  




  return (
    <div className="w-full">
  <h1 className="text-2xl font-bold mb-4">Crypto List</h1>
  <section>
  <form className="mb-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div className="mb-4 sm:col-span-2 md:col-span-4 lg:col-span-5">
          <label className="text-sm font-medium text-gray-700">Buscar por nombre o símbolo:</label>
          <div className="flex">
            <input 
            type="text" 
            name="search" 
            className="mt-1 p-2 w-full rounded-l border" 
            placeholder="Ej. Bitcoin, BTC" 
            value={searchQuery}
            onChange={handleSearchChange}
            
            />
            {/* {console.log(handleSearchChange)} */}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600">Buscar</button>
          </div>
        </div>
        <div className="mb-4 sm:col-span-2 md:col-span-1">
          <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
          <select name="sort" className="mt-1 p-2 rounded border w-full">
            <option value="name">Nombre</option>
            <option value="symbol">Símbolo</option>
            <option value="market_cap">Market Cap</option>
            <option value="total_volume">Volumen Total</option>
          </select>
        </div>
        <div className="mb-4 sm:col-span-2 md:col-span-1">
          <label className="text-sm font-medium text-gray-700">Filtrar por Volumen:</label>
          <select name="volume_filter" className="mt-1 p-2 rounded border w-full">
            <option value="">Todos</option>
            <option value="top_20">Top 20</option>
          </select>
        </div>
      </div>
    </form>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {filteredCryptos.map((crypto) => (
        <div key={crypto.id} className="bg-white p-4 rounded shadow">
          <Link to={`/detail/${crypto.id}`}> 
            <img src={crypto.image} alt={crypto.name} className="w-16 h-16 mx-auto mb-2" />
          </Link>
          <button>⭐️</button>
          <p className="text-center">Name: {crypto.name}</p>
          <p className="text-center">Symbol: {crypto.symbol}</p>
          <p className="text-center">Market cap: {crypto.market_cap}</p>
          {/* <p className="text-center">Total volume: {crypto.total_volume}</p> */}
        </div>
      ))}
    </div>
  </section>
</div>
  

  );
}

export default Home;
