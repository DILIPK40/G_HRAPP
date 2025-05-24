import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/dashboard');
  redirect('/auth/login');
}
