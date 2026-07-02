import express from 'express';
import { query } from '../config/db.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM events ORDER BY date DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, category, date, venue, guests, equipment, description, images, testimonial } = req.body;
    const result = await query(
      `INSERT INTO events (title, category, date, venue, guests, equipment, description, images, testimonial)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, category, date, venue, guests, equipment || [], description, images || [], testimonial]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { title, category, date, venue, guests, equipment, description, images, testimonial } = req.body;
    const result = await query(
      `UPDATE events SET title=$1, category=$2, date=$3, venue=$4, guests=$5, 
       equipment=$6, description=$7, images=$8, testimonial=$9, updated_at=CURRENT_TIMESTAMP
       WHERE id=$10 RETURNING *`,
      [title, category, date, venue, guests, equipment || [], description, images || [], testimonial, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const result = await query('DELETE FROM events WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export default router;