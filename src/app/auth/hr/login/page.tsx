
'use client';
import LoginForm from '@/components/auth/login-form';
import { loginHr } from './actions';

export default function HrLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <LoginForm
        roleName="HR"
        action={loginHr}
        redirectTo="/hr/dashboard"
      />
    </div>
  );
}
