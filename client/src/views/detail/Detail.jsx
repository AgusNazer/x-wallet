import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailCrypto } from "../../redux/actions";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const crypto = useSelector((state) => state.detailCrypto);

  useEffect(() => {
    // Llama a la acción para cargar los detalles de la criptomoneda
    dispatch(getDetailCrypto(id));
  }, [dispatch, id]);

  return (
    <div>
      {crypto && (
        <div>
          <h2>{crypto.name}</h2>
          <img src={crypto.image} alt={crypto.name} />
          {/* Puedes mostrar otros detalles de la criptomoneda aquí */}
        </div>
      )}
    </div>
  );
};

export default Detail