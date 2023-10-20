

const axios = require('axios');
const Cryptocurrency = require('../models/cryptosModel'); // Importa tu modelo de criptomonedas


// Controlador para guardar todas las criptomonedas en MongoDB
// const saveAllCryptos = async (req, res) => {
//   try {
//     // Realiza una solicitud a la API de Coingecko para obtener la lista de criptomonedas
//     const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
//     const cryptoList = response.data;

//     // Recorre la lista de criptomonedas y guárdalas en la base de datos si no existen
//     for (const crypto of cryptoList) {
//       const { id, name, symbol } = crypto;

//       // Verifica si ya existe una criptomoneda con el mismo ID en la base de datos
//       const existingCrypto = await Cryptocurrency.findOne({ id });

//       // Si no existe, crea un nuevo documento de criptomoneda y guárdalo
//       if (!existingCrypto) {
//         const newCrypto = new Cryptocurrency({
//           id,
//           name,
//           symbol,
//           // Agrega más campos y detalles aquí si es necesario
//         });

//         // Guarda el nuevo documento en la base de datos
//         await newCrypto.save();
//       }
//     }

//     res.status(201).json({ message: 'Todas las criptomonedas guardadas correctamente' });
//   } catch (error) {
//     console.error('Error al guardar todas las criptomonedas:', error);
//     res.status(500).json({ error: 'Ocurrió un error al guardar todas las criptomonedas.' });
//   }
// };

// Controlador para buscar y guardar enla DB
const getAllCryptos = async (req, res) => {
  try {
    const { name } = req.query;

    // Parámetros para la solicitud a la API de Coingecko
    const apiParams = {
      vs_currency: 'usd',
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

    // Guardar los datos en la base de datos
    for (const crypto of cryptocurrencyData) {
      const { id, name, symbol, market_cap } = crypto;

      // Verifica si ya existe una criptomoneda con el mismo ID en la base de datos
      const existingCrypto = await Cryptocurrency.findOne({ id });

      // Si no existe, crea un nuevo documento de criptomoneda y guárdalo
      if (!existingCrypto) {
        const newCrypto = new Cryptocurrency({
          id,
          name,
          symbol,
          market_cap
          // Agrega más campos y detalles aquí si es necesario
        });

        // Guarda el nuevo documento en la base de datos
        await newCrypto.save();
      }
    }

    res.json(cryptocurrencyData);
  } catch (error) {
    console.error('Error al obtener y guardar criptomonedas:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener y guardar criptomonedas.' });
  }
};
  
  


// Controlador para buscar criptomonedas por nombre o símbolo en mi DB
const searchCryptocurrenciesDB = async (req, res) => {
  try {
    const { name, symbol } = req.query;

    // Realiza una búsqueda en la base de datos MongoDB
    const cryptocurrencies = await Cryptocurrency.find({ name: name, symbol:symbol });

    res.json(cryptocurrencies);
  } catch (error) {
    console.error('Error al buscar criptomonedas en la base de datos:', error);
    res.status(500).json({ error: 'Ocurrió un error al buscar criptomonedas en la base de datos.' });
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
  // saveAllCryptos,
  getAllCryptos,
  searchCryptocurrenciesDB,
  getAllCryptocurrencies,
  saveCryptocurrency,
  sortCryptocurrencies,

  // Agrega otros controladores aquí
};
