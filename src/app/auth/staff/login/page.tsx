
'use client';
import LoginForm from '@/components/auth/login-form';
import { loginStaff } from './actions';

export default function StaffLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <LoginForm
        roleName="Staff"
        action={loginStaff}
        redirectTo="/staff/dashboard"
      />
    </div>
  );
}
