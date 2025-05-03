import { registerUser, loginUser } from '../services/authService.js';

const validateUser = (body) => {
  const { email, password, name, role } = body;
  if (!email || !password || !name || !role) {
    throw new Error('All fields (email, password, name, role) are required');
  }
};

export const register = async (req, res) => {
  try {
    validateUser(req.body);
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { token, user } = await loginUser(req.body);
    res.json({ message: 'Login successful', token, user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
