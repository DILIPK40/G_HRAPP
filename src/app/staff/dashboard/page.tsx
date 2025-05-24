
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";

export default function StaffDashboardPage() {
  return (
    <div className="container mx-auto py-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
          <User className="mr-3 h-8 w-8 text-primary" /> Staff Dashboard
        </h1>
        <p className="text-muted-foreground">Your personal workspace and tools.</p>
      </header>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Welcome, Staff Member!</CardTitle>
          <CardDescription>Access your tasks, company updates, and personal information.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">Staff-specific content and tools will appear here.</p>
           <ul className="mt-4 space-y-2 list-disc list-inside text-muted-foreground">
            <li>My Tasks</li>
            <li>Company Announcements</li>
            <li>Leave Requests</li>
            <li>Profile Settings</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
