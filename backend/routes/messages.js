import express from 'express';
import { query } from '../config/db.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, eventDate, message } = req.body;
    const result = await query(
      'INSERT INTO messages (name, email, phone, service, event_date, message) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, email, phone, service, eventDate, message]
    );
    res.status(201).json({ success: true, message: 'Message sent successfully', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

router.get('/', verifyAdmin, async (req, res) => {
  try {
    const result = await query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const result = await query('DELETE FROM messages WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

export default router;