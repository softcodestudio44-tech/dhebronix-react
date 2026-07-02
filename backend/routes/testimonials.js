import express from 'express';
import { query } from '../config/db.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM testimonials ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, event, rating, text } = req.body;
    const result = await query(
      'INSERT INTO testimonials (name, event, rating, text) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, event, rating, text]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { name, event, rating, text } = req.body;
    const result = await query(
      'UPDATE testimonials SET name=$1, event=$2, rating=$3, text=$4 WHERE id=$5 RETURNING *',
      [name, event, rating, text, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const result = await query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

export default router;