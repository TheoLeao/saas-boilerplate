import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Settings,
  FileText,
  Server,
} from 'lucide-react';

export type NavSection = 'main' | 'system';

export type NavItem = {
  id: string;
  to: string;
  label: string;
  icon: LucideIcon;
  section: NavSection;
  /** Groupe affiché dans la palette ⌘K */
  searchGroup: string;
};

export const navItems: NavItem[] = [
  {
    id: 'dashboard',
    to: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
    section: 'main',
    searchGroup: 'Pages',
  },
  {
    id: 'docs',
    to: '/docs',
    label: 'Documentation',
    icon: FileText,
    section: 'main',
    searchGroup: 'Pages',
  },
  {
    id: 'system-health',
    to: '/system/health',
    label: 'Santé API',
    icon: Server,
    section: 'system',
    searchGroup: 'Système',
  },
];

export const settingsNavItem: NavItem = {
  id: 'settings',
  to: '/settings',
  label: 'Paramètres',
  icon: Settings,
  section: 'main',
  searchGroup: 'Système',
};

export type PageMeta = { title: string; breadcrumb: string[] };

const exactMeta: Record<string, PageMeta> = {
  '/': { title: 'Dashboard', breadcrumb: ['Dashboard'] },
  '/settings': { title: 'Paramètres', breadcrumb: ['Paramètres'] },
  '/docs': { title: 'Documentation', breadcrumb: ['Documentation'] },
  '/system/health': { title: 'Santé API', breadcrumb: ['Système', 'Santé API'] },
};

export function resolvePageMeta(pathname: string): PageMeta {
  if (exactMeta[pathname]) return exactMeta[pathname]!;
  return { title: 'SaaS App', breadcrumb: [] };
}

export function buildSearchCommands() {
  const fromNav = navItems.map((n) => ({
    id: n.id,
    label: n.label,
    path: n.to,
    icon: n.icon,
    group: n.searchGroup,
  }));
  const settings = {
    id: settingsNavItem.id,
    label: settingsNavItem.label,
    path: settingsNavItem.to,
    icon: settingsNavItem.icon,
    group: settingsNavItem.searchGroup,
  };
  return [...fromNav, settings];
}
