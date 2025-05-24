
'use client';
import LoginForm from '@/components/auth/login-form';
import { loginMdCeo } from './actions';

export default function MdCeoLoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <LoginForm
        roleName="MD / CEO"
        action={loginMdCeo}
        redirectTo="/md-ceo/dashboard"
      />
    </div>
  );
}
