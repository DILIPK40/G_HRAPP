import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';
import { verifyAuth } from '../../lib/auth';
import * as yup from 'yup';

const emailSchema = yup.string().email('Invalid email format');

const employeeSchema = yup.object().shape({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: emailSchema.required('Email is required'),
  phone_number: yup.string(),
  hire_date: yup.date().required('Hire date is required').nullable(true), // Adjust based on your database schema and frontend needs
  job_title: yup.string().required('Job title is required'),
  department_id: yup.number().required('Department ID is required'),
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authenticatedUser = await verifyAuth(req.cookies);

  if (!authenticatedUser) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  
  
  switch (req.method) { 
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
    const { page, pageSize, sortBy, sortDesc, filterBy, filterValue } = req.query;

    let query = 'SELECT * FROM employees';
    const queryParams: any[] = [];

    // Filtering
    if (filterBy && filterValue && typeof filterBy === 'string' && typeof filterValue === 'string') {
      // Basic filtering for demonstration. Consider adding more robust handling
      // and preventing SQL injection by ensuring filterBy is a valid column name.
      // A safer approach would be to have a predefined list of filterable columns.
      const allowedFilterColumns = ['first_name', 'last_name', 'email', 'job_title']; // Example allowed columns
      if (allowedFilterColumns.includes(filterBy)) {
        query += ` WHERE ${filterBy} LIKE ?`;
        queryParams.push(`%${filterValue}%`);
      }
    }

    // Sorting
    if (sortBy && typeof sortBy === 'string') {
      const sortOrder = sortDesc === 'true' ? 'DESC' : 'ASC';
      // Prevent SQL injection by validating sortBy column name
      const allowedSortColumns = ['first_name', 'last_name', 'email', 'hire_date', 'job_title', 'department_id']; // Example allowed columns
       if (allowedSortColumns.includes(sortBy)) {
        query += ` ORDER BY ${sortBy} ${sortOrder}`;
      }
    }

    // Pagination
    if (page && pageSize && typeof page === 'string' && typeof pageSize === 'string') {
      const pageNumber = parseInt(page as string, 10);
      const size = parseInt(pageSize as string, 10);
      const offset = (pageNumber - 1) * size;
      query += ' LIMIT ? OFFSET ?';
      queryParams.push(size, offset);
    }

    const [rows] = await pool.query(query, queryParams);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ message: 'Error fetching employees' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { first_name, last_name, email, phone_number, hire_date, job_title, department_id } = req.body;
  console.log('Received POST request body:', req.body); // Added for debugging
  
  try {
    await employeeSchema.validate(req.body, { abortEarly: false });
  } catch (validationError: any) {
    return res.status(400).json({ message: 'Validation failed', errors: validationError.errors });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO employees (first_name, last_name, email, phone_number, hire_date, job_title, department_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [first_name, last_name, email, phone_number, hire_date, job_title, department_id]
    );
    res.status(201).json({ id: (result as any).insertId, first_name, last_name, email, phone_number, hire_date, job_title, department_id });
    console.log('Employee created successfully:', { id: (result as any).insertId }); // Added for debugging
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ message: 'Error creating employee' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  const { id, first_name, last_name, email, phone_number, hire_date, job_title, department_id } = req.body;

  const fieldsToUpdate: string[] = [];
  const values: any[] = [];

  // Validate required fields if they are present in the body
  try {
    if (first_name !== undefined) await yup.string().required('First name is required').validate(first_name);
    if (last_name !== undefined) await yup.string().required('Last name is required').validate(last_name);
    if (email !== undefined) await emailSchema.required('Email is required').validate(email);
    if (job_title !== undefined) await yup.string().required('Job title is required').validate(job_title);
    if (department_id !== undefined) await yup.number().required('Department ID is required').validate(department_id);
    if (hire_date !== undefined) await yup.date().required('Hire date is required').nullable(true).validate(hire_date);
  } catch (validationError: any) {
    return res.status(400).json({ message: 'Validation failed', errors: validationError.errors });
  }

  if (first_name !== undefined) {
    fieldsToUpdate.push('first_name = ?');
    values.push(first_name);
  }
  if (last_name !== undefined ) { // Added validation for last_name here as well
    fieldsToUpdate.push('last_name = ?');
    values.push(last_name);
  }
  if (email !== undefined ) { // Added validation for email here as well
    fieldsToUpdate.push('email = ?');
    values.push(email);
  }
  if (phone_number !== undefined) {
    fieldsToUpdate.push('phone_number = ?');
    values.push(phone_number);
  }
  if (hire_date !== undefined ) { // Added validation for hire_date here as well
    fieldsToUpdate.push('hire_date = ?');
    values.push(hire_date);
  }
  if (job_title !== undefined ) { // Added validation for job_title here as well
    fieldsToUpdate.push('job_title = ?');
    values.push(job_title);
  }
  if (department_id !== undefined ) { // Added validation for department_id here as well
    fieldsToUpdate.push('department_id = ?');
    values.push(department_id);
  }

  if (!id) {
    return res.status(400).json({ message: 'Employee ID is required for update' });
  }
  
  if (fieldsToUpdate.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }
  

  values.push(id);

  console.log('Executing UPDATE query:', `UPDATE employees SET ${fieldsToUpdate.join(', ')} WHERE id = ?`, values); // Added for debugging
  try {
    const [result] = await pool.query(
      `UPDATE employees SET ${fieldsToUpdate.join(', ')} WHERE id = ?`,
      values
    );
    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ id, first_name, last_name, email, phone_number, hire_date, job_title, department_id }); // Return potentially partial updated data
    console.log('Employee updated successfully:', { id }); // Added for debugging
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
    console.log('Employee deleted successfully:', { id }); // Added for debugging
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Error deleting employee' });
  }
}