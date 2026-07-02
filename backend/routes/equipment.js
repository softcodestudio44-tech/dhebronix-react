import express from 'express';
import { query } from '../config/db.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM equipment WHERE available = true ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

router.get('/all', verifyAdmin, async (req, res) => {
  try {
    const result = await query('SELECT * FROM equipment ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM equipment WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Equipment not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch equipment' });
  }
});

router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, category, price, oldPrice, condition, brand, specs, description, images, available } = req.body;
    const result = await query(
      `INSERT INTO equipment (name, category, price, old_price, condition, brand, specs, description, images, available)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [name, category, price, oldPrice, condition, brand, specs, description, images || [], available !== false]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create equipment' });
  }
});

router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { name, category, price, oldPrice, condition, brand, specs, description, images, available } = req.body;
    const result = await query(
      `UPDATE equipment SET name=$1, category=$2, price=$3, old_price=$4, condition=$5,
       brand=$6, specs=$7, description=$8, images=$9, available=$10, updated_at=CURRENT_TIMESTAMP
       WHERE id=$11 RETURNING *`,
      [name, category, price, oldPrice, condition, brand, specs, description, images || [], available !== false, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Equipment not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update equipment' });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const result = await query('DELETE FROM equipment WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Equipment not found' });
    res.json({ message: 'Equipment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete equipment' });
  }
});

export default router;