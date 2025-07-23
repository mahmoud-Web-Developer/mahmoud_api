const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = [];

exports.signup = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = { id: users.length + 1, username, password: hashedPassword };
  users.push(user);
  res.status(201).json({ message: 'User registered successfully' });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
}; 