import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';
import { Toaster } from '@/components/ui/toaster';
import AppShell from '@/components/app-shell';
import { verifyAuth } from '@/lib/auth'; // Ensure verifyAuth is imported

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Staff Savvy',
  description: 'Modern HR Management Platform',
};

export default function RootLayout({ // RootLayout should be synchronous if verifyAuth is synchronous
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const authenticatedUser = verifyAuth(cookieStore); // Call verifyAuth synchronously
  const isAuthenticated = !!authenticatedUser;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <SidebarProvider defaultOpen>
          <AppShell isAuthenticated={isAuthenticated}>{children}</AppShell>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
