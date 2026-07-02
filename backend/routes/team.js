import express from 'express';
import { query } from '../config/db.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM team_members ORDER BY created_at ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, role, image, linkedin, instagram, bio } = req.body;
    const result = await query(
      'INSERT INTO team_members (name, role, image, linkedin, instagram, bio) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, role, image, linkedin, instagram, bio]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create team member' });
  }
});

router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { name, role, image, linkedin, instagram, bio } = req.body;
    const result = await query(
      'UPDATE team_members SET name=$1, role=$2, image=$3, linkedin=$4, instagram=$5, bio=$6 WHERE id=$7 RETURNING *',
      [name, role, image, linkedin, instagram, bio, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update team member' });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const result = await query('DELETE FROM team_members WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

export default router;