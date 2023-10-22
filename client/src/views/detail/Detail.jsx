import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCrypto } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { Link } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const crypto = useSelector((state) => state.detailCrypto);
  const [details, setDetails] = useState({});

  useEffect(() => {
    // Llama a la acción para cargar los detalles de la criptomoneda
    dispatch(getDetailCrypto(id));
  }, [id, dispatch]);
  console.log(id);

  useEffect(() => {
  setDetails(details)
  },[details])

  if (!crypto) {
    // Los detalles todavía se están cargando, muestra un mensaje de carga o algo similar.
    return <p>Cargando detalles...</p>;
  }

  return (
    
     <div className="p-6 border rounded-lg shadow-lg bg-gradient-to-r from-gray-500 via-sky-900 to-gray-400 text-white">
          
          <Link to='/home'>
          <BsFillArrowLeftCircleFill className="w-8 h-8 "/>
          </Link>
      <div className="max-w-md mx-auto">
        <div className="text-center">
          <img
            src={crypto.image.large}
            alt={crypto.name}
            className="w-32 h-32 mx-auto rounded-full shadow-lg"
          />
          <h2 className="text-2xl font-bold mt-4">{crypto.name}</h2>
          <p className="text-sm">Genesis date: {crypto.genesis_date}</p>
          <p className="text-sm">Hashing algorithm: {crypto.hashing_algorithm}</p>
          <p className="text-sm">Market cap rank: {crypto.market_cap_rank}</p>
          <p className="text-sm mt-2">
            Description: {crypto.description.en.replace(/<[^>]*>/g, "")}
          </p>
        </div>
      </div>
    </div>
   
  );
};

export default Detail