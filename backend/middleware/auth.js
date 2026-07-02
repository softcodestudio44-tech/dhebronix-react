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
  
  console.log('DEBUG: Login attempt');
  console.log('DEBUG: Input password length:', password?.length);
  console.log('DEBUG: Stored password exists:', !!adminPassword);
  console.log('DEBUG: Stored password length:', adminPassword?.length);
  
  if (!adminPassword) {
    throw new Error('Admin password not configured');
  }
  
  const cleanInput = password.trim();
  const cleanStored = adminPassword.trim();
  
  console.log('DEBUG: Input trimmed length:', cleanInput.length);
  console.log('DEBUG: Stored trimmed length:', cleanStored.length);
  console.log('DEBUG: Passwords match:', cleanInput === cleanStored);
  
  if (cleanInput === cleanStored) {
    console.log('DEBUG: Plain text match successful');
    return jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
  }
  
  console.log('DEBUG: Plain text match failed, trying bcrypt');
  
  try {
    const isMatch = await bcryptjs.compare(cleanInput, cleanStored);
    console.log('DEBUG: Bcrypt match result:', isMatch);
    if (isMatch) {
      return jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    }
  } catch (err) {
    console.log('DEBUG: Bcrypt error:', err.message);
  }
  
  console.log('DEBUG: All comparisons failed');
  throw new Error('Invalid password');
};