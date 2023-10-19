// Favorites.jsx
import { useState } from "react";

const Favorites = ({ favorites, removeFromFavorites }) => {
  return (
    <div>
      <h2>Mis Favoritos</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            {favorite.name} - {favorite.symbol}
            <button onClick={() => removeFromFavorites(favorite.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
