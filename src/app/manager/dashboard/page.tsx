
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function ManagerDashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
          <Users className="mr-3 h-8 w-8 text-primary" /> Manager Dashboard
        </h1>
        <p className="text-muted-foreground">Team overview and management tools.</p>
      </header>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Welcome, Manager!</CardTitle>
          <CardDescription>Oversee your team's performance, approve requests, and manage resources.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">Manager-specific tools and team data will be here.</p>
          <ul className="mt-4 space-y-2 list-disc list-inside text-muted-foreground">
            <li>Team Performance Metrics</li>
            <li>Approve Absence Requests</li>
            <li>Resource Allocation</li>
            <li>Reporting Tools</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
