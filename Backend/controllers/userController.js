//ejemplo
const getUsers = (req, res) => {
  const users = [
    { id: 1, name: 'Ana', email: 'ana@example.com' },
    { id: 2, name: 'Carlos', email: 'carlos@example.com' },
    { id: 3, name: 'Luisa', email: 'luisa@example.com' }
  ];
  
  res.json(users);
};

module.exports = {
  getUsers,
};