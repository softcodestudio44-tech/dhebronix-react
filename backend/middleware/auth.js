import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

export const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export const authenticateAdmin = verifyAdmin;

export const loginAdmin = async (password) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    throw new Error('Admin password not configured');
  }
  
  if (password === adminPassword) {
    return jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
  }
  
  const isMatch = await bcryptjs.compare(password, adminPassword);
  if (!isMatch) {
    throw new Error('Invalid password');
  }
  
  return jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
};