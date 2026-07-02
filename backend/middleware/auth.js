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
  
  // Trim both passwords to remove any accidental whitespace
  const cleanInput = password.trim();
  const cleanStored = adminPassword.trim();
  
  // Direct comparison (plain text password)
  if (cleanInput === cleanStored) {
    return jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
  }
  
  // Fallback: try bcrypt comparison if password is hashed
  try {
    const isMatch = await bcryptjs.compare(cleanInput, cleanStored);
    if (isMatch) {
      return jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    }
  } catch (err) {
    // bcrypt compare failed (stored password is not a hash)
    console.log('Bcrypt comparison failed, password is plain text');
  }
  
  throw new Error('Invalid password');
};