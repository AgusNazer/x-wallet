const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: String,  // ID del usuario de Firebase
  username: String, // Nombre del usuario (opcional)
  email: String,
  // Otros campos para datos de autenticación con correo electrónico y contraseña
  password: String, // Almacena la contraseña hasheada (asegúrate de hashearla antes de guardarla)
});

const User = mongoose.model('User', userSchema);

module.exports = User;