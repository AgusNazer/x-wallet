const express = require('express');
const router = express.Router();

const { getUsers } = require('../controllers/usersController');

// Define las rutas
router.get('/users', getUsers);
// Agrega más rutas si es necesario

module.exports = router;