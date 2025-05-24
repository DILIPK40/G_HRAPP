import { deleteCookie } from 'cookies-next/headers';
import { cookies } from 'next/headers';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      deleteCookie('auth_token', { cookies });
      res.status(200).json({ success: true, message: 'Logged out' });
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({ success: false, message: 'Error logging out' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}