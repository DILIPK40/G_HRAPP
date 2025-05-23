import RecognitionForm from './components/recognition-form';

export default function RecognitionPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Employee Recognition</h1>
        <p className="text-muted-foreground">Leverage AI to craft impactful recognition messages.</p>
      </header>
      <RecognitionForm />
    </div>
  );
}
