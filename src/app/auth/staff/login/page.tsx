
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/login-form';
// import { loginStaff } from './actions'; // We will replace this with API call

export default function StaffLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        // Assuming a successful response has { success: true } and possibly role
        router.push('/staff/dashboard'); // Redirect to staff dashboard on success
      } else {
        // Assuming error response has { success: false, message: '...' }
        setError(data.message || 'An error occurred during login.');
      }
    })
    .catch((err) => {
      console.error('Login fetch error:', err);
      setError('Failed to connect to the server.');
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <LoginForm
        roleName="Staff"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
