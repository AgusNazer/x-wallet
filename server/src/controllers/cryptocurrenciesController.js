

const axios = require('axios');
const Cryptocurrency = require('../models/cryptosModel'); // Importa tu modelo de criptomonedas

// Controlador para buscar y ordenar las criptomonedas
const getAllCryptos = async (req, res) => {
    try {
      const { name, order } = req.query;
  
      // Parámetros para la solicitud a la API de Coingecko
      const apiParams = {
        vs_currency: 'usd',
        order: order || 'market_cap_desc', // Orden por capitalización de mercado descendente (por defecto)
        per_page: 100,
        page: 1,
        sparkline: false,
      };
  
      // Si se proporciona un nombre de criptomoneda, agregamos el parámetro 'name' a la solicitud
      if (name) {
        apiParams.name = name;
      }
  
      // Realiza una solicitud GET a la API de Coingecko con los parámetros configurados
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: apiParams,
      });
  
      const cryptocurrencyData = response.data;
  
      res.json(cryptocurrencyData);
    } catch (error) {
      console.error('Error al obtener criptomonedas:', error);
      res.status(500).json({ error: 'Ocurrió un error al obtener criptomonedas.' });
    }
  };
  
  


// Controlador para buscar criptomonedas por nombre o símbolo
const searchCryptocurrencies = async (req, res) => {
  try {
    const { name, symbol } = req.query;

    // Implementa la lógica de búsqueda aquí
    // Por ejemplo, puedes usar la API de Coingecko para buscar criptomonedas

    // Ejemplo de búsqueda con la API de Coingecko
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${symbol || name}`);
    const cryptocurrencyData = response.data;

    res.json(cryptocurrencyData);
  } catch (error) {
    console.error('Error al buscar criptomonedas:', error);
    res.status(500).json({ error: 'Ocurrió un error al buscar criptomonedas.' });
  }
};

// Controlador para obtener todas las criptomonedas desde MongoDB
const getAllCryptocurrencies = async (req, res) => {
  try {
    // Implementa la lógica para obtener todas las criptomonedas desde MongoDB aquí
    const cryptocurrencies = await Cryptocurrency.find();
    res.json(cryptocurrencies);
  } catch (error) {
    console.error('Error al obtener criptomonedas desde MongoDB:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener criptomonedas desde MongoDB.' });
  }
};

// Controlador para guardar una criptomoneda en MongoDB
const saveCryptocurrency = async (req, res) => {
  try {
    const { name, symbol, market_cap, total_volumen } = req.body;

    // Implementa la lógica para guardar una criptomoneda en MongoDB aquí
    const cryptocurrency = new Cryptocurrency({
      name,
      symbol,
      market_cap,
      total_volumen,
    });
    await cryptocurrency.save();

    res.json({ message: 'Criptomoneda guardada con éxito.' });
  } catch (error) {
    console.error('Error al guardar criptomoneda en MongoDB:', error);
    res.status(500).json({ error: 'Ocurrió un error al guardar criptomoneda en MongoDB.' });
  }
};

// Controlador para ordenar las criptomonedas
const sortCryptocurrencies = async (req, res) => {
    const { sortBy } = req.query;
  
    try {
      // Realiza una solicitud GET a la API de Coingecko para obtener todas las criptomonedas
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd', // Puedes especificar una moneda de referencia
          order: sortBy, // Ordena según el parámetro 'sortBy' especificado
          per_page: 100, // Número de criptomonedas por página
          page: 1, // Número de página
          sparkline: false, // Si deseas datos de tendencias
        },
      });
  
      const cryptocurrencyData = response.data;
  
      res.json(cryptocurrencyData);
    } catch (error) {
      console.error('Error al ordenar criptomonedas:', error);
      res.status(500).json({ error: 'Ocurrió un error al ordenar criptomonedas.' });
    }
  };
  

module.exports = {
  getAllCryptos,
  searchCryptocurrencies,
  getAllCryptocurrencies,
  saveCryptocurrency,
  sortCryptocurrencies,

  // Agrega otros controladores aquí
};
