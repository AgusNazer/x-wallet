
import { useSelector } from "react-redux";
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
import {  useDispatch } from "react-redux";
import { deleteFavorites } from "../../redux/actions";



function Favorites() {
  const dispatch = useDispatch();
 
  // Accede al arreglo de favoritos desde el estado de Redux
  const favorites = useSelector((state) => state.favorites);
//   const [localFavorites, setLocalFavorites] = useState([]);


const handleDeleteFavorite = (favorite) => {
  // Llama a la acción deleteFavorites con la criptomoneda que deseas eliminar
  dispatch(deleteFavorites(favorite)); //esto se envia al reducer del store de redux
  // console.log(favorite);
};
  
  return (
    <div className="w-full">
  <Link to='/home'>
    <BsFillArrowLeftCircleFill className="w-8 h-8" />
    <h2 className="mb-8 font-bold">My Favorites</h2>
  </Link>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
    {favorites.map((favorite) => (
      <div key={favorite._id} className="bg-white p-4 rounded shadow">
        <Link to={`/detail/${favorite.id}`}>
        <img
          src={favorite.image}
          alt={favorite.name}
          className="w-16 h-16 mx-auto mb-2"
        />
        </Link>

        <p className="text-center">Name: {favorite.name}</p>
        <p className="text-center">Symbol: {favorite.symbol}</p>
        <p className="text-center">Market cap: {favorite.market_cap}</p>
        <p className="text-center">id: {favorite.id}</p>
        {/* {console.log(favorite)} */}
        {/* <p className="text-center">Total volume: {crypto.total_volume}</p> */}
        <button 
        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
        onClick={() => handleDeleteFavorite(favorite.name)}
        >Delete</button>
      </div>
    ))}
  </div>
</div>

  );
}

export default Favorites;

