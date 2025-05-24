
'use client';
import LoginForm from '@/components/auth/login-form';
import { loginManager } from './actions';

export default function ManagerLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <LoginForm
        roleName="Manager"
        action={loginManager}
        redirectTo="/manager/dashboard"
      />
    </div>
  );
}
