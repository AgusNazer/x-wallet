

const axios = require('axios');
const Cryptocurrency = require('../models/cryptosModel'); // Importa tu modelo de criptomonedas

// Controlador para buscar y guardar en la DB
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
    // Si se proporciona un nombre de criptomoneda, consultamos la API de Coingecko para obtener el ID
    if (name) {
      // Consultar la API para obtener el ID de la criptomoneda por nombre
      const idResponse = await axios.get('https://api.coingecko.com/api/v3/coins/list', {
        params: {
          include_platform: false, // Ajusta esto según tus necesidades
        },
      });

      // Buscamos el ID correcto en la respuesta de la API
      const matchingCrypto = idResponse.data.find(crypto => crypto.name === name);

      if (matchingCrypto) {
        // Utiliza el ID encontrado en la consulta a la API de mercado
        apiParams.ids = matchingCrypto.id;
      } else {
        console.error('Criptomoneda no encontrada.');
        return res.status(404).json({ error: 'Criptomoneda no encontrada' });
      }
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

    // Inicializamos un objeto de filtro vacío
    const filter = {};

    // Comprobamos si se proporcionó el parámetro 'name' en la solicitud
    if (name) {
      // Si se proporcionó, agregamos una condición para buscar por nombre
      filter.name = name;
    }

    // Comprobamos si se proporcionó el parámetro 'symbol' en la solicitud
    if (symbol) {
      // Si se proporcionó, agregamos una condición para buscar por símbolo
      filter.symbol = symbol;
    }

    // Realizamos la búsqueda en la base de datos utilizando el operador OR
    const cryptocurrencies = await Cryptocurrency.find({ $or: [filter] });

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

// Controlador para obtener el detail de una crypto

const getDetailCrypto = async (req, res) => {
  try {
    // Obtener el ID de la criptomoneda desde los parámetros de la URL
    const { id } = req.params;
console.log(`Crypto con id: ${id}`);
    // Realizar una solicitud a la API de CoinGecko para obtener los detalles de la criptomoneda
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);

    if (response.data) {
      // Si se obtienen datos de la API, responder con los detalles
      return res.json(response.data);
    } else {
      // Si la respuesta de la API no contiene datos, responder con un mensaje de error
      return res.status(404).json({ error: 'Criptomoneda no encontrada' });
    }
  } catch (error) {
    // Manejo de errores en caso de que ocurra una excepción
    console.error('Error al obtener detalles de la criptomoneda desde la API:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
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
  getDetailCrypto,
  searchCryptocurrenciesDB,
  getAllCryptocurrencies,
  saveCryptocurrency,
  sortCryptocurrencies,

  // Agrega otros controladores aquí
};
