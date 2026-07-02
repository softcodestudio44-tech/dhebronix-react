import express from 'express';
import { query } from '../config/db.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM settings LIMIT 1');
    if (result.rows.length === 0) return res.status(404).json({ error: 'Settings not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

router.put('/', verifyAdmin, async (req, res) => {
  try {
    const { companyName, phone, email, address, whatsapp, facebook, instagram, youtube, twitter } = req.body;
    const result = await query(
      `UPDATE settings SET company_name=$1, phone=$2, email=$3, address=$4, whatsapp=$5,
       facebook=$6, instagram=$7, youtube=$8, twitter=$9, updated_at=CURRENT_TIMESTAMP
       WHERE id=(SELECT id FROM settings LIMIT 1) RETURNING *`,
      [companyName, phone, email, address, whatsapp, facebook, instagram, youtube, twitter]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;