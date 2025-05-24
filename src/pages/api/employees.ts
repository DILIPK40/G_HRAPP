import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      await handleGet(req, res);
      break;
    case 'POST':
      await handlePost(req, res);
      break;
    case 'PUT':
      await handlePut(req, res);
      break;
    case 'DELETE':
      await handleDelete(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const [rows] = await pool.query('SELECT * FROM employees');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { first_name, last_name, email, phone_number, hire_date, job_title, department_id } = req.body;

  if (!first_name || !last_name) {
    return res.status(400).json({ message: 'First name and last name are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job_title, department_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, phone_number, hire_date, job_title, department_id]
    );
    res.status(201).json({ id: (result as any).insertId, first_name, last_name, email, phone_number, hire_date, job_title, department_id });
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Error creating employee' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id, first_name, last_name, email, phone_number, hire_date, job_title, department_id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Employee ID is required' });
  }

  const fieldsToUpdate: string[] = [];
  const values: any[] = [];

  if (first_name !== undefined) {
    fieldsToUpdate.push('first_name = ?');
    values.push(first_name);
  }
  if (last_name !== undefined) {
    fieldsToUpdate.push('last_name = ?');
    values.push(last_name);
  }
  if (email !== undefined) {
    fieldsToUpdate.push('email = ?');
    values.push(email);
  }
  if (phone_number !== undefined) {
    fieldsToUpdate.push('phone_number = ?');
    values.push(phone_number);
  }
  if (hire_date !== undefined) {
    fieldsToUpdate.push('hire_date = ?');
    values.push(hire_date);
  }
  if (job_title !== undefined) {
    fieldsToUpdate.push('job_title = ?');
    values.push(job_title);
  }
  if (department_id !== undefined) {
    fieldsToUpdate.push('department_id = ?');
    values.push(department_id);
  }

  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  values.push(id);

  try {
    const [result] = await pool.query(
      `UPDATE employees SET ${fieldsToUpdate.join(', ')} WHERE id = ?`,
      values
    );
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ id, first_name, last_name, email, phone_number, hire_date, job_title, department_id }); // Return potentially partial updated data
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Error updating employee' });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Employee ID is required' });
  }

  try {
    const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [id]);
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Error deleting employee' });
  }
}