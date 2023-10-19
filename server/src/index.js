const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cryptocurrenciesRoutes = require('./routes/cryptocurrenciesRouter');


dotenv.config();
// Usa las rutas en la aplicación

const app = express();
const PORT = process.env.PORT || 3000;
// Configuración de middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Habilita el envío de cookies y encabezados de autenticación
  }));
app.use(express.json());

// const encuestasRoutes = require('./routes/encuestasRoutes');
// const respuestasRoutes = require('./routes/respuestasRoutes');


mongoose 
.connect(process.env.MONGODB_URL)
.then(() => console.log(`Connected to MongoDB...`))
.catch((err) => console.log(err));

app.use('/', cryptocurrenciesRoutes);


// Definir rutas y controladores aquí (en pasos posteriores).

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server listening at port: ${PORT}`);
});