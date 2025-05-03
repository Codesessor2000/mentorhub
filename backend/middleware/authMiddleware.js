import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Assuming 'Bearer token'

  if (!token) {
    return res.status(403).json({ error: 'Token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = decoded; // Save user data in request
    next();
  });
};
