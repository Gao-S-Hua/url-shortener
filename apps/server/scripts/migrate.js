const fs = require('node:fs');
const path = require('node:path');
const mysql = require('mysql2/promise');

async function migrate() {
  // Load .env if present
  const dotenv = require('dotenv');
  dotenv.config();

  const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'url_shortener',
    multipleStatements: true,
  };

  const migrationDir = path.join(__dirname, '..', 'migration');
  const files = fs
    .readdirSync(migrationDir)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  if (files.length === 0) {
    console.log('No migration files found.');
    return;
  }

  const connection = await mysql.createConnection(dbConfig);

  try {
    // Ensure migrations tracking table exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS _migrations (
        name VARCHAR(255) PRIMARY KEY,
        executed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);

    // Get already-run migrations
    const [rows] = await connection.execute('SELECT name FROM _migrations');
    const completed = new Set(rows.map((r) => r.name));

    for (const file of files) {
      if (completed.has(file)) {
        console.log(`[SKIP] ${file} — already executed`);
        continue;
      }

      const sql = fs.readFileSync(path.join(migrationDir, file), 'utf-8');
      console.log(`[RUN]  ${file}...`);
      await connection.execute(sql);

      await connection.execute('INSERT INTO _migrations (name) VALUES (?)', [
        file,
      ]);
      console.log(`[OK]   ${file}`);
    }
  } finally {
    await connection.end();
  }

  console.log('Migration complete.');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
