
'use client';

import { type FormEvent, useActionState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LogIn, Terminal } from "lucide-react";

interface LoginFormProps {
  roleName: string;
  action: (prevState: any, formData: FormData) => Promise<any>;
  redirectTo: string; // For simulated redirect message
}

type LoginFormState = {
  message: string | null;
  success?: boolean;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
      {pending ? 'Signing In...' : 'Sign In'}
      <LogIn className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function LoginForm({ roleName, action, redirectTo }: LoginFormProps) {
  const initialState: LoginFormState = { message: null };
  const [state, formAction] = useActionState(action, initialState);

  // In a real app, successful login would redirect via the server action.
  // Here we just show a message if the (placeholder) server action indicates success.
  // useEffect(() => {
  //   if (state.success) {
  //     // router.push(redirectTo) or server action handles redirect
  //   }
  // }, [state.success, redirectTo, router]);

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{roleName} Login</CardTitle>
        <CardDescription>Enter your credentials to access the {roleName.toLowerCase()} portal.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              aria-invalid={!!state.fieldErrors?.email}
              aria-describedby="email-error"
            />
            {state.fieldErrors?.email && (
              <p id="email-error" className="text-sm text-destructive mt-1">{state.fieldErrors.email.join(', ')}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              aria-invalid={!!state.fieldErrors?.password}
              aria-describedby="password-error"
            />
            {state.fieldErrors?.password && (
              <p id="password-error" className="text-sm text-destructive mt-1">{state.fieldErrors.password.join(', ')}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
          {state.message && !state.success && (
            <Alert variant="destructive" className="w-full">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
           {state.message && state.success && ( // Placeholder for success message if not redirecting immediately
            <Alert variant="default" className="w-full bg-green-500/10 border-green-500/30">
              <LogIn className="h-4 w-4" />
              <AlertTitle>Login Action Processed</AlertTitle>
              <AlertDescription>{state.message} Redirecting to {redirectTo}...</AlertDescription>
            </Alert>
          )}
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
