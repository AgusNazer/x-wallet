

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
// router.get('/sortByName', cryptocurrenciesController.sortByName);

// Rutas para buscar criptomonedas por nombre o símbolo en la DB
router.get('/search', cryptocurrenciesController.searchCryptocurrenciesDB);

// Ruta para obtener crypto por id (detail)
router.get('/detail/:id', cryptocurrenciesController.getDetailCrypto);

// Ruta para guardar y ver favoritos
router.post('/fav', cryptocurrenciesController.addToFavorites);

// // Ruta para agregar un favorito a la base de datos
// router.post('/addFavorite', cryptocurrenciesController.add

// Ruta para borrar de favos
router.delete('/delete/:id', cryptocurrenciesController.deleteFavorites)
module.exports = router;
