

const express = require('express');
const router = express.Router();
const cryptocurrenciesController = require('../controllers/cryptocurrenciesController'); // Importa el controlador

router.get('/allCryptos', cryptocurrenciesController.getAllCryptos);

// Rutas para buscar criptomonedas por nombre o símbolo
router.get('/search', cryptocurrenciesController.searchCryptocurrencies);

// Ruta para obtener todas las criptomonedas desde MongoDB
router.get('/cryptocurrencies', cryptocurrenciesController.getAllCryptocurrencies);

// Ruta para guardar una criptomoneda en MongoDB
router.post('/cryptocurrencies', cryptocurrenciesController.saveCryptocurrency);

// Ruta para ordenar las criptomonedas
router.get('/sort', cryptocurrenciesController.sortCryptocurrencies);

module.exports = router;
