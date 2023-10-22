const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  id: String, // ID de la criptomoneda en Coingecko
  name: String, // Nombre de la criptomoneda
  symbol: String, // Símbolo de la criptomoneda
  market_cap: Number,
  total_volumen: Number,
  image: String,
  description: String
});

const Favorites = mongoose.model('Favorites', favoriteSchema);

module.exports = Favorites;
