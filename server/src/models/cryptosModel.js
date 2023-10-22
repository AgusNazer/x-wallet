// Modelo de Criptomoneda:
// Este modelo se utilizará para almacenar información sobre las
//  criptomonedas obtenidas de la API de Coingecko. Puedes ajustar 
//  los campos según los datos que desees almacenar.


const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  id: String, // ID de la criptomoneda en Coingecko
  name: String, // Nombre de la criptomoneda
  symbol: String, // Símbolo de la criptomoneda
  market_cap: Number,
  total_volumen: Number,
  image: String,
  description: String
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;