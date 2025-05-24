import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarRail,
} from '@/components/ui/sidebar';
import AppHeader from '@/components/app-header';
import MainNav from '@/components/main-nav';
import { Award } from 'lucide-react'; // Using Award as a placeholder logo icon
import Link from 'next/link';

export default function AppShell({ children }: { children: React.ReactNode }) {
export default function AppShell({ children, isAuthenticated }: { children: React.ReactNode; isAuthenticated: boolean }) {
  return (
    <div className="flex min-h-screen w-full">
      {isAuthenticated && (
      <Sidebar collapsible="icon" variant="sidebar">
        <SidebarHeader className="p-3">
          <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <Award className="h-7 w-7 text-primary transition-all group-hover:scale-110" />
            <h1 className="text-xl font-semibold text-primary group-data-[collapsible=icon]:hidden">
              Staff Savvy
            </h1>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2 pr-0">
          <MainNav />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      )}
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 pt-0 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </SidebarInset>
    </div>
  );
}
