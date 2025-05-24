
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookUser } from "lucide-react";

export default function HrDashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
          <BookUser className="mr-3 h-8 w-8 text-primary" /> HR Dashboard
        </h1>
        <p className="text-muted-foreground">Employee management and human resources tools.</p>
      </header>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Human Resources Portal</CardTitle>
          <CardDescription>Manage employee data, recruitment, payroll, and HR policies.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">HR-specific functionalities and employee information will be accessible here.</p>
           <ul className="mt-4 space-y-2 list-disc list-inside text-muted-foreground">
            <li>Employee Records Management</li>
            <li>Recruitment Pipeline</li>
            <li>Payroll Processing</li>
            <li>Benefits Administration</li>
            <li>Policy Management</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
