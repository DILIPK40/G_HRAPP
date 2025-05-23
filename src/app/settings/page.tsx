import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserCircle, Shield, Bell } from "lucide-react";

export default function SettingsPage() {
  // Placeholder user data
  const user = {
    name: "Current User",
    email: "user@example.com",
    role: "Administrator",
    avatarUrl: "https://placehold.co/128x128.png",
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="sticky top-20"> {/* Sticky for larger screens */}
            <CardHeader className="items-center text-center">
               <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary ring-offset-2 ring-offset-background">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile avatar" />
                <AvatarFallback><UserCircle className="h-12 w-12" /></AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <CardDescription className="font-medium text-primary">{user.role}</CardDescription>
            </CardHeader>
             <CardContent>
               {/* Placeholder for navigation within settings if needed */}
               {/* <Button variant="ghost" className="w-full justify-start"><UserCircle className="mr-2 h-4 w-4" /> Profile</Button>
               <Button variant="ghost" className="w-full justify-start"><Shield className="mr-2 h-4 w-4" /> Security</Button>
               <Button variant="ghost" className="w-full justify-start"><Bell className="mr-2 h-4 w-4" /> Notifications</Button> */}
             </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={user.name} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user.email} readOnly />
                 <p className="text-xs text-muted-foreground">Email address cannot be changed.</p>
              </div>
               <div className="space-y-1">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input id="avatar" defaultValue={user.avatarUrl} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto bg-accent text-accent-foreground hover:bg-accent/90">Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">Change Password</h3>
                  <p className="text-sm text-muted-foreground">Update your account password regularly.</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-md">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                </div>
                <Button variant="outline" disabled>Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Access Control (Placeholder)</CardTitle>
              <CardDescription>Permissions and roles are managed by administrators. This section is for informational purposes.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your current role is: <span className="font-semibold text-primary">{user.role}</span>.
                This role grants you specific permissions within Staff Savvy.
                If you believe your access rights are incorrect, please contact your system administrator.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
