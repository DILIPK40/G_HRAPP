import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/lib/db'; // Assuming your database connection is here
import { verifyAuth } from '@/lib/auth'; // Import verifyAuth

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verify authentication for all department operations
  const authenticatedUser = await verifyAuth(req.cookies);

  if (!authenticatedUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      // Handle GET request - fetch departments
      try {
        const result = await pool.query('SELECT * FROM departments');
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ message: 'Error fetching departments' });
      }
      break;
    case 'POST':
      // Handle POST request - add a new department
      try {
        const { name, description } = req.body;

        // Basic validation
        if (!name) {
          return res.status(400).json({ message: 'Department name is required' });
        }

        const result = await pool.query(
          'INSERT INTO departments (name, description) VALUES ($1, $2) RETURNING *',
          [name, description]
        );
        res.status(201).json(result.rows[0]);
      } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).json({ message: 'Error creating department' });
      }
      break;
    case 'PUT':
      // Handle PUT request - update a department
      try {
        const { id } = req.query;
        const { name, description } = req.body;

        // Basic validation for PUT
        if (!id) {
          return res.status(400).json({ message: 'Department ID is required' });
        }
        if (!name && description === undefined) {
           return res.status(400).json({ message: 'At least name or description must be provided for update' });
        }

        // Validate that name is not empty if provided
        if (name !== undefined && name.trim() === '') {
           return res.status(400).json({ message: '\'name\' cannot be empty' });
        }
 const result = await pool.query(
          'UPDATE departments SET name = COALESCE($1, name), description = COALESCE($2, description) WHERE id = $3 RETURNING *',
          [name, description, id]
        );

        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'Department not found' });
        }

        res.status(200).json(result.rows[0]);
      } catch (error) {
        console.error('Error updating department:', error);
        res.status(500).json({ message: 'Error updating department' });
      }
      break;
    case 'DELETE':
      // Handle DELETE request - delete a department
      try {
        const { id } = req.query;
        const result = await pool.query('DELETE FROM departments WHERE id = $1', [id]);
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'Department not found' });
        }
        res.status(204).end(); // No content for successful deletion
      } catch (error) {
        console.error('Error deleting department:', error);
        res.status(500).json({ message: 'Error deleting department' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}