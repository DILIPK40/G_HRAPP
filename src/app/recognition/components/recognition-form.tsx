'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Sparkles, CheckCircle2 } from "lucide-react";
import { submitRecognitionRequest, type RecognitionFormState } from '../actions';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? 'Generating...' : 'Generate Message'}
      <Sparkles className="ml-2 h-4 w-4" />
    </Button>
  );
}

export default function RecognitionForm() {
  const initialState: RecognitionFormState = { message: null };
  const [state, formAction] = useFormState(submitRecognitionRequest, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success && state.generatedMessage) {
      toast({
        title: "Success!",
        description: state.message,
        variant: "default",
      });
      formRef.current?.reset(); // Reset form on successful generation
    } else if (!state.success && state.message && !state.fieldErrors && !state.issues) {
      // General error not related to fields
       toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast]);


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">AI-Powered Recognition</CardTitle>
        <CardDescription>Generate personalized employee recognition messages.</CardDescription>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="employeeName">Employee Name</Label>
            <Input 
              id="employeeName" 
              name="employeeName" 
              placeholder="e.g., Jane Doe" 
              defaultValue={state.fields?.employeeName}
              aria-invalid={!!state.fieldErrors?.employeeName}
              aria-describedby="employeeName-error"
            />
            {state.fieldErrors?.employeeName && (
              <p id="employeeName-error" className="text-sm text-destructive mt-1">{state.fieldErrors.employeeName.join(', ')}</p>
            )}
          </div>
          <div>
            <Label htmlFor="achievement">Achievement</Label>
            <Textarea
              id="achievement"
              name="achievement"
              placeholder="e.g., Successfully launched the new product feature ahead of schedule."
              defaultValue={state.fields?.achievement}
              aria-invalid={!!state.fieldErrors?.achievement}
              aria-describedby="achievement-error"
            />
            {state.fieldErrors?.achievement && (
              <p id="achievement-error" className="text-sm text-destructive mt-1">{state.fieldErrors.achievement.join(', ')}</p>
            )}
          </div>
          <div>
            <Label htmlFor="companyValue">Company Value</Label>
            <Input
              id="companyValue"
              name="companyValue"
              placeholder="e.g., Innovation, Teamwork, Customer Focus"
              defaultValue={state.fields?.companyValue}
              aria-invalid={!!state.fieldErrors?.companyValue}
              aria-describedby="companyValue-error"
            />
            {state.fieldErrors?.companyValue && (
              <p id="companyValue-error" className="text-sm text-destructive mt-1">{state.fieldErrors.companyValue.join(', ')}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-4">
           {state.message && !state.success && (state.fieldErrors || state.issues) && (
            <Alert variant="destructive" className="w-full">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
          <SubmitButton />
        </CardFooter>
      </form>
      {state.success && state.generatedMessage && (
        <div className="p-6 border-t">
            <Alert variant="default" className="bg-primary/10 border-primary/30">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <AlertTitle className="font-semibold text-primary">Generated Recognition Message:</AlertTitle>
              <AlertDescription className="mt-2 text-foreground whitespace-pre-wrap">{state.generatedMessage}</AlertDescription>
            </Alert>
        </div>
      )}
    </Card>
  );
}
