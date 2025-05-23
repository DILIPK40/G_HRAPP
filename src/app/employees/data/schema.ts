import { z } from 'zod';

export const employeeSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  department: z.string(),
  role: z.string(),
  status: z.enum(['Active', 'On Leave', 'Inactive']),
  avatarUrl: z.string().optional(),
  joiningDate: z.string(),
});

export type EmployeeSchema = z.infer<typeof employeeSchema>;
