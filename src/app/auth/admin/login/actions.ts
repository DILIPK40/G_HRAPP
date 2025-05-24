
'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';

const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export type LoginFormState = {
  message: string | null;
  success?: boolean;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

export async function loginAdmin(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check the fields.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  // Placeholder authentication logic
  if (
    validatedFields.data.email === 'admin@example.com' &&
    validatedFields.data.password === 'password'
  ) {
    // In a real app, you would set a session cookie here
    // For now, we redirect directly.
    redirect('/admin/dashboard');
    // Unreachable, but good for illustrating success state if not redirecting
    // return { message: 'Login successful!', success: true };
  } else {
    return {
      message: 'Invalid email or password.',
      success: false,
    };
  }
}
