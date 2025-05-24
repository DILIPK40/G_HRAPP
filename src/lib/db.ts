import mysql, { Pool, PoolOptions } from 'mysql2/promise';

const dbConfig: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const pool: Pool = mysql.createPool(dbConfig);

export default pool;