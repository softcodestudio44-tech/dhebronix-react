import express from 'express';
import { query } from '../config/db.js';
import { verifyAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await query("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY date DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

router.get('/all', verifyAdmin, async (req, res) => {
  try {
    const result = await query('SELECT * FROM blog_posts ORDER BY date DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM blog_posts WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Blog post not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog post' });
  }
});

router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { title, category, author, date, content, excerpt, tags, image, status } = req.body;
    const result = await query(
      `INSERT INTO blog_posts (title, category, author, date, content, excerpt, tags, image, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [title, category, author, date, content, excerpt, tags || [], image, status || 'published']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create blog post' });
  }
});

router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { title, category, author, date, content, excerpt, tags, image, status } = req.body;
    const result = await query(
      `UPDATE blog_posts SET title=$1, category=$2, author=$3, date=$4, content=$5,
       excerpt=$6, tags=$7, image=$8, status=$9, updated_at=CURRENT_TIMESTAMP WHERE id=$10 RETURNING *`,
      [title, category, author, date, content, excerpt, tags || [], image, status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Blog post not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update blog post' });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const result = await query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Blog post not found' });
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete blog post' });
  }
});

export default router;