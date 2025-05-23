'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CalendarOff,
  Megaphone,
  Award,
  Timer,
  Building,
  Settings,
  Icon,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export interface NavItem {
  href: string;
  label: string;
  icon: Icon;
  matchSegments?: number; // Number of path segments to match for active state
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, matchSegments: 1 },
  { href: '/employees', label: 'Employees', icon: Users, matchSegments: 1 },
  { href: '/absences', label: 'Absences', icon: CalendarOff, matchSegments: 1 },
  { href: '/feed', label: 'Company Feed', icon: Megaphone, matchSegments: 1 },
  { href: '/recognition', label: 'Recognition', icon: Award, matchSegments: 1 },
  { href: '/attendance', label: 'Attendance', icon: Timer, matchSegments: 1 },
  { href: '/departments', label: 'Departments', icon: Building, matchSegments: 1 },
  { href: '/settings', label: 'Settings', icon: Settings, matchSegments: 1 },
];

export default function MainNav() {
  const pathname = usePathname();

  const isActive = (href: string, matchSegments?: number) => {
    if (matchSegments) {
      const currentSegments = pathname.split('/').filter(Boolean);
      const itemSegments = href.split('/').filter(Boolean);
      if (currentSegments.length < matchSegments || itemSegments.length < matchSegments) {
        return pathname === href;
      }
      return currentSegments.slice(0, matchSegments).join('/') === itemSegments.slice(0, matchSegments).join('/');
    }
    return pathname === href;
  };
  

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              isActive={isActive(item.href, item.matchSegments)}
              tooltip={{ children: item.label, className: 'text-xs' }}
              className={cn(
                isActive(item.href, item.matchSegments)
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                'justify-start'
              )}
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
