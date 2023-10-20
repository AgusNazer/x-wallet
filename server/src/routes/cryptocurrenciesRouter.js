

const express = require('express');
const router = express.Router();
const cryptocurrenciesController = require('../controllers/cryptocurrenciesController'); // Importa el controlador

// Ruta para obtener y guardar todas las criptomonedas desde MongoDB
// router.get('/saveAllCryptos', cryptocurrenciesController.saveAllCryptos);

// Ruta para obtener las cryptos de la apio y guardarlas en base de datos
router.get('/allCryptos', cryptocurrenciesController.getAllCryptos);

// Ruta para obtener todas las criptomonedas desde MongoDB
router.get('/cryptocurrencies', cryptocurrenciesController.getAllCryptocurrencies);

// Ruta para guardar (Crear) una criptomoneda en MongoDB
router.post('/cryptocurrencies', cryptocurrenciesController.saveCryptocurrency);

// Ruta para ordenar las criptomonedas
router.get('/sort', cryptocurrenciesController.sortCryptocurrencies);

// Rutas para buscar criptomonedas por nombre o símbolo en la DB
router.get('/search', cryptocurrenciesController.searchCryptocurrenciesDB);

module.exports = router;
