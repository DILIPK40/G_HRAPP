
'use client';
import LoginForm from '@/components/auth/login-form';
import { loginAdmin } from './actions';

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <LoginForm
        roleName="Admin"
        action={loginAdmin}
        redirectTo="/admin/dashboard"
      />
    </div>
  );
}
