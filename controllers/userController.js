const users = [
  { id: 1, name: 'Admin', email: 'admin@example.com', role: 'admin' },
  { id: 2, name: 'Aya', email: 'aya@example.com', role: 'author' }
];
let nextId = 3;
const { estNonVide, estEmailValide } = require('../utils/validators');
const getAllUsers = (req, res) => {
  const { role } = req.query;

  let result = users;
  if (role) {
    result = users.filter(user => user.role === role);
  }
  res.json({ total: result.length, users: result });
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({ error: `User ${id} not found` });
  }
  res.json(user);
};

const createUser = (req, res) => {
  const { name, email, role } = req.body ?? {};
  if (!estNonVide(name)) {
    return res.status(400).json({ error: 'Name is required and cannot be empty' });
  }
  if (!estEmailValide(email)) {
    return res.status(400).json({ error: 'Email must be valid and contain @ and .' });
  }

  const newUser = { id: nextId, name, email, role: role || 'reader' };
  nextId += 1;
  users.push(newUser);

  res.status(201).json({ message: 'User created', user: newUser });
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(user => user.id === id);

  if (!user) {
    return res.status(404).json({ error: `User ${id} not found` });
  }

  const { name, email, role } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;

  res.status(200).json({ message: 'User updated', user });
};

const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex(user => user.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `User ${id} not found` });
  }

  users.splice(index, 1);
  res.status(200).json({ message: `User ${id} deleted successfully` });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
