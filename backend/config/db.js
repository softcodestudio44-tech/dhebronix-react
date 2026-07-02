import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  },
  max: 5, // Reduced from 20
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 30000,
  keepAlive: true,
});

pool.on('error', (err) => {
  console.error('Unexpected database error:', err);
});

export const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
};

export const initDB = async () => {
  try {
    await query('SELECT NOW()');
    console.log('Database connected successfully');

    await query(`
      CREATE TABLE IF NOT EXISTS events (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        date DATE,
        venue TEXT,
        guests TEXT,
        equipment TEXT[],
        description TEXT,
        images TEXT[],
        testimonial TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS equipment (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price INTEGER NOT NULL,
        old_price INTEGER,
        condition TEXT DEFAULT 'new',
        brand TEXT,
        specs TEXT,
        description TEXT,
        images TEXT[],
        available BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        author TEXT DEFAULT 'DHEBRONIX Team',
        date DATE DEFAULT CURRENT_DATE,
        content TEXT,
        excerpt TEXT,
        tags TEXT[],
        image TEXT,
        status TEXT DEFAULT 'published',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        event TEXT NOT NULL,
        rating INTEGER DEFAULT 5,
        text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS team_members (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        image TEXT,
        linkedin TEXT,
        instagram TEXT,
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        service TEXT,
        event_date DATE,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS settings (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        company_name TEXT DEFAULT 'DHEBRONIX Multimedia Company',
        phone TEXT DEFAULT '+234 803 728 0457',
        email TEXT DEFAULT 'dhebronixmultimedia@gmail.com',
        address TEXT DEFAULT 'Lagos, Nigeria',
        whatsapp TEXT DEFAULT '+2348037280457',
        facebook TEXT,
        instagram TEXT,
        youtube TEXT,
        twitter TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const settingsCheck = await query('SELECT COUNT(*) FROM settings');
    if (parseInt(settingsCheck.rows[0].count) === 0) {
      await query(`
        INSERT INTO settings (company_name, phone, email, address, whatsapp, facebook, instagram, youtube)
        VALUES ('DHEBRONIX Multimedia Company', '+234 803 728 0457', 'dhebronixmultimedia@gmail.com', 'Lagos, Nigeria', '+2348037280457', 'https://www.facebook.com/profile.php?id=100091654633566', 'https://www.instagram.com/dhebronixmc', 'https://youtube.com/@dhebronixmultimedia935')
      `);
    }

    const teamCheck = await query('SELECT COUNT(*) FROM team_members');
    if (parseInt(teamCheck.rows[0].count) === 0) {
      await query(`
        INSERT INTO team_members (name, role, linkedin, instagram)
        VALUES 
          ('Adebowale Prince Aderibigbe', 'Founder & Lead Sound Engineer', '#', '#'),
          ('Elizabeth Aderibigbe', 'Event Planning & Management', '#', '#')
      `);
    }

    const testimonialCheck = await query('SELECT COUNT(*) FROM testimonials');
    if (parseInt(testimonialCheck.rows[0].count) === 0) {
      await query(`
        INSERT INTO testimonials (name, event, rating, text)
        VALUES 
          ('Adebayo & Funke Johnson', 'Wedding Reception', 5, 'DHEBRONIX made our wedding reception absolutely perfect! The sound quality was incredible and the team was so professional. Highly recommended!'),
          ('Chidera Okafor', 'GTBank Corporate Event', 5, 'We have used DHEBRONIX for all our corporate events. Their attention to detail and professionalism is unmatched. The sound is always crystal clear.'),
          ('Pastor Emmanuel Ade', 'Church Concert', 5, 'Amazing concert setup! 500+ guests and every person could hear perfectly. DHEBRONIX are true professionals who know their craft.')
      `);
    }

    console.log('All tables initialized');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};

export default pool;