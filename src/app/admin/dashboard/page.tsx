
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center">
          <ShieldAlert className="mr-3 h-8 w-8 text-primary" /> Admin Dashboard
        </h1>
        <p className="text-muted-foreground">System administration and overview.</p>
      </header>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Welcome, Admin!</CardTitle>
          <CardDescription>Manage users, settings, and monitor system activity from this central hub.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">Admin-specific tools and information will be displayed here.</p>
          <ul className="mt-4 space-y-2 list-disc list-inside text-muted-foreground">
            <li>User Management</li>
            <li>System Configuration</li>
            <li>Audit Logs</li>
            <li>Content Moderation</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
