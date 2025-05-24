import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';
import { setCookie } from 'cookies-next/headers';
import jwt from 'jsonwebtoken';
// You'll need to install and import a library like bcrypt for password comparison
// import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await handlePost(req, res);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const jwtSecret = process.env.JWT_SECRET;
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const users = rows as any[]; // Cast to appropriate type

    if (users.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const user = users[0];
    // TODO: Replace with actual password comparison using a library like bcrypt
    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = (password === user.password); // TEMPORARY: REPLACE WITH SECURE COMPARISON

    if (passwordMatch) {
      if (!jwtSecret) {
        console.error('JWT_SECRET is not defined in environment variables');
        return res.status(500).json({ success: false, message: 'Server configuration error' });
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });

      setCookie('auth_token', token, { req, res, httpOnly: true, secure: process.env.NODE_ENV !== 'development', maxAge: 60 * 60 * 1, path: '/' }); // Set cookie for 1 hour

      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}