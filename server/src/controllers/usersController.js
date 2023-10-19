const getUsers = (req, res) => {
    // Lógica para obtener usuarios
    // Puedes usar Firebase aquí para obtener los usuarios
    res.json({ message: 'Obteniendo usuarios' });
  };
  module.exports = {
    getUsers,
    // Agrega más controladores si es necesario
  };