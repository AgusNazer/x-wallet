import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCryptos, addToFavorites } from "../../redux/actions";
import { Link } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
// import { AuthProvider, useAuth } from "../../context/AuthContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


function Home() {
  const auth = useAuth()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cryptos = useSelector((state) => state.cryptos);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCryptos, setFilteredCryptos] = useState([]);
  const [orderValue, setOrderValue] = useState("asc"); // Estado para el ordenamiento
  const [volumeFilter, setVolumeFilter] = useState("all");
  // const { user } = useAuth();
  // const [favorites, setFavorites] = useState([]);


  // Accede a la lista de favoritos desde el estado global de Redux
  const favorites = useSelector((state) => state.favorites);

  

  useEffect(() => {
    dispatch(getAllCryptos());
   
  }, [dispatch]);


  
  useEffect(() => {
    // Filtra las criptomonedas en función de la búsqueda y el orden
    const filtered = cryptos.filter((crypto) => {
      return (
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    // Ordena las criptomonedas en función de orderValue
    const sorted = [...filtered];
    if (orderValue === "asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (orderValue === "desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }

    let filteredAndSorted = [...sorted];

    if (volumeFilter === "top_20") {
      // Aplica el filtro de las 20 primeras criptomonedas (ajusta según tus datos)
      filteredAndSorted = filteredAndSorted.slice(0, 20);
    }

    setFilteredCryptos(filteredAndSorted);
  }, [cryptos, searchQuery, orderValue, volumeFilter]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrderValue(event.target.value);
    setVolumeFilter(event.target.value);
  };
  const handleFilterChange = (event) => {
    setVolumeFilter(event.target.value);
  };


  //arreglar la persistencia de datos en local storage
  const handleAddToFavorites = (crypto) => {
    dispatch(addToFavorites(crypto));

    alert(`Crypto ${crypto.name} added to favorites`)
     // Actualiza los favoritos en el estado local
  };


   //! REVISAR POR QUE NO FUNCIONA LA PERSISTENCIA DE DATOS
   // Escuchar cambios en la lista de favoritos y actualizar el almacenamiento local
   useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);


  const handleLogout = () => {
    // Muestra un cuadro de diálogo de confirmación
    const userConfirmed = window.confirm("Are you sure you want to log out?");
    
    if (userConfirmed) {
      auth.logout();
      alert("Logout");
      navigate('/');
    } else {
      // El usuario canceló el cierre de sesión
      alert("Logout canceled");
    }
  };
  return (
    <div className="w-full">
      <div className="flex ">
      <button  onClick={handleLogout}>
      <BiLogOutCircle className="w-8 h-8 text-red-700 mb-2" />
      </button>
      <Link to={'/favorites'}>
      <MdFavoriteBorder className="w-8 h-8 text-sky-700" />
      </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Crypto List</h1>
      <section>
        <form className="mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <div className="mb-4 sm:col-span-2 md:col-span-4 lg:col-span-5">
              <label className="text-sm font-medium text-gray-700">
                Search by name or Ticker symbol
              </label>
              <div className="flex ">
                <input
                  type="text"
                  name="search"
                  className="mt-1 p-2 w-full rounded-l border"
                  placeholder="Ex. Bitcoin, BTC"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className="mt-1 bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="mb-4 sm:col-span-2 md:col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Order by name:
              </label>
              <select
                name="sort"
                className="mt-1 p-2 rounded border w-full"
                value={orderValue}
                onChange={handleOrderChange}
              >
                <option value="asc">Name (Asc)</option>
                <option value="desc">Name (Desc)</option>
              </select>
            </div>
            <div className="mb-4 sm:col-span-2 md:col-span-1">
              <label className="text-sm font-medium text-gray-700">
                Filter by volume:
              </label>
              <select
                name="volume_filter"
                className="mt-1 p-2 rounded border w-full"
                value={volumeFilter}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="top_20">Top 20</option>
              </select>
            </div>
          </div>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredCryptos.map((crypto) => (
            <div key={crypto.id} className="bg-white p-4 rounded shadow">
              <Link to={`/detail/${crypto.id}`}>
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-16 h-16 mx-auto mb-2"
                />
              </Link>

              <button onClick={() => handleAddToFavorites(crypto)}>⭐️</button>
               {/* {alert(`Crypto: ${crypto.name} added to favorites`)} */}
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
