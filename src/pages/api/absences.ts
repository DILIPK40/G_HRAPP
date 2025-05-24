import type { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '@/server/db'; // Adjust the import path to your database connection pool

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isDateValid = (dateString: string): boolean => /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  switch (req.method) {
    case 'GET': {
      try {
        const { employeeId, type, status, startDate, endDate, sortBy, sortOrder, page, limit } = req.query;

        let query = 'SELECT * FROM absence_requests';
        const conditions: string[] = [];
        const params: any[] = [];

        if (employeeId) {
          conditions.push('employee_id = ?');
          params.push(employeeId);
        }
        if (type) {
          conditions.push('type = ?');
          params.push(type);
        }
        if (status) {
          conditions.push('status = ?');
          params.push(status);
        }
        if (startDate && isDateValid(startDate as string)) {
          conditions.push('start_date >= ?');
          params.push(startDate);
        }
        if (endDate && isDateValid(endDate as string)) {
          conditions.push('end_date <= ?');
          params.push(endDate);
        }

        if (conditions.length > 0) {
          query += ' WHERE ' + conditions.join(' AND ');
        }

        // Basic sorting - enhance with validation for allowed columns
        const validSortColumns = ['start_date', 'end_date', 'type', 'status']; // Add other valid columns
        const sortColumn = sortBy && validSortColumns.includes(sortBy as string) ? sortBy : 'start_date'; // Default sort
        const order = sortOrder && (sortOrder === 'ASC' || sortOrder === 'DESC') ? sortOrder : 'DESC'; // Default order
        query += ` ORDER BY ${sortColumn} ${order}`;

        // Pagination
        const pageNum = parseInt(page as string) || 1;
        const limitNum = parseInt(limit as string) || 10; // Default limit
        const offset = (pageNum - 1) * limitNum;
        query += ' LIMIT ? OFFSET ?';
        params.push(limitNum, offset);

        const [rows] = await pool.query(query, params);
        res.status(200).json(rows);
      } catch (error) {
        console.error('Error fetching absence requests:', error);
        res.status(500).json({ message: 'Error fetching absence requests' });
      }
      break;
    }
    case 'POST': {
      try {
        const { employee_id, start_date, end_date, type, reason } = req.body;

        // Backend validation for POST
        const errors: string[] = [];
        if (!employee_id) errors.push('Employee ID is required.');
        if (!start_date) errors.push('Start date is required.');
        if (!end_date) errors.push('End date is required.');
        if (!type) errors.push('Absence type is required.');

        if (start_date && !isDateValid(start_date)) errors.push('Invalid start date format (YYYY-MM-DD).');
        if (end_date && !isDateValid(end_date)) errors.push('Invalid end date format (YYYY-MM-DD).');

        if (start_date && end_date && isDateValid(start_date) && isDateValid(end_date) && new Date(start_date) > new Date(end_date)) {
          errors.push('End date cannot be before start date.');
        }
        if (errors.length > 0) return res.status(400).json({ message: 'Validation failed', errors });

        const [result]: any = await pool.query(
          'INSERT INTO absence_requests (employee_id, start_date, end_date, type, reason, status) VALUES (?, ?, ?, ?, ?, ?)',
          [employee_id, start_date, end_date, type, reason || null, 'Pending'] // Default status
        );

        res.status(201).json({ id: result.insertId, message: 'Absence request created' });
      } catch (error) {
        console.error('Error creating absence request:', error);
        res.status(500).json({ message: 'Error creating absence request' });
      }
      break;
    }
    case 'PUT': {
      try {
        const { id, employee_id, start_date, end_date, type, reason, status } = req.body;

        // Backend validation for PUT
        const errors: string[] = [];
        if (!id) errors.push('Absence request ID is required.');
        // Only validate fields if they are provided in the request body for partial updates
        if (start_date !== undefined && !isDateValid(start_date)) errors.push('Invalid start date format (YYYY-MM-DD).');
        if (end_date !== undefined && !isDateValid(end_date)) errors.push('Invalid end date format (YYYY-MM-DD).');

        // Validate date range only if both dates are provided and valid
        if (start_date !== undefined && end_date !== undefined && isDateValid(start_date) && isDateValid(end_date)) {
             if (new Date(start_date) > new Date(end_date)) {
                errors.push('End date cannot be before start date.');
            }
        } else if (start_date !== undefined && end_date === undefined && isDateValid(start_date)) {
            // If only start_date is updated, check against the current end_date in the database
            // This requires fetching the current record first, which adds complexity.
            // For simplicity here, we skip this check in the basic validation.
        } // Similar logic if only end_date is updated

        if (errors.length > 0) return res.status(400).json({ message: 'Validation failed', errors });

        // Build update query dynamically based on provided fields
        const updates: string[] = [];
        const values: any[] = [];

        if (employee_id !== undefined) {
          updates.push('employee_id = ?');
          values.push(employee_id);
        }
        if (start_date !== undefined) {
          updates.push('start_date = ?');
          values.push(start_date);
        }
        if (end_date !== undefined) {
          updates.push('end_date = ?');
          values.push(end_date);
        }
        if (type !== undefined) {
          updates.push('type = ?');
          values.push(type);
        }
        if (reason !== undefined) {
          updates.push('reason = ?');
          values.push(reason);
        }
        if (status !== undefined) {
          // Add validation for allowed status values if needed
          updates.push('status = ?');
          values.push(status);
        }

        if (updates.length === 0) {
          return res.status(400).json({ message: 'No fields to update' });
        }

        values.push(id); // Add ID for the WHERE clause

        await pool.query(`UPDATE absence_requests SET ${updates.join(', ')} WHERE id = ?`, values);

        res.status(200).json({ message: `Absence request with ID ${id} updated` });
      } catch (error) {
        console.error('Error updating absence request:', error);
        res.status(500).json({ message: 'Error updating absence request' });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']); // Include DELETE if you uncomment it
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}