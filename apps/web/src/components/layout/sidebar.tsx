import { NavLink } from 'react-router';
import {
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { useAppStore } from '@/stores/app.store';
import { useAuthStore } from '@/stores/auth.store';
import { useNavigate } from 'react-router';
import { navItems, settingsNavItem, type NavItem } from '@/config/nav';

function NavButton({
  item,
  collapsed,
}: {
  item: NavItem;
  collapsed: boolean;
}) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-[var(--radius-md)] text-sm transition-colors',
          collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2',
          isActive
            ? 'bg-[var(--sidebar-active)] font-medium text-[var(--sidebar-active-fg)]'
            : 'text-[var(--sidebar-fg-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-fg)]',
        )
      }
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && item.label}
    </NavLink>
  );
}

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const main = navItems.filter((i) => i.section === 'main');
  const system = navItems.filter((i) => i.section === 'system');

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-[var(--shell-border)] bg-[var(--sidebar-bg)] transition-[width] duration-200',
        sidebarCollapsed ? 'w-16' : 'w-56',
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-[var(--shell-border)] px-3">
        {!sidebarCollapsed && (
          <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-lg font-bold tracking-tight text-transparent">
            SaaS App
          </span>
        )}
        <button
          type="button"
          onClick={toggleSidebar}
          className="rounded-[var(--radius-md)] p-1.5 text-[var(--sidebar-fg-muted)] transition-colors hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-fg)]"
          aria-label={sidebarCollapsed ? 'Étendre le menu' : 'Réduire le menu'}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
        {main.map((item) => (
          <NavButton key={item.id} item={item} collapsed={sidebarCollapsed} />
        ))}

        {system.length > 0 && (
          <div className="mt-3 border-t border-[var(--shell-border)] pt-3">
            {!sidebarCollapsed && (
              <p className="px-3 pb-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--sidebar-fg-muted)]">
                Système
              </p>
            )}
            {system.map((item) => (
              <NavButton key={item.id} item={item} collapsed={sidebarCollapsed} />
            ))}
          </div>
        )}
      </nav>

      <div className="space-y-0.5 border-t border-[var(--shell-border)] p-2">
        <NavLink
          to={settingsNavItem.to}
          title={sidebarCollapsed ? settingsNavItem.label : undefined}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-[var(--radius-md)] text-sm transition-colors',
              sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2',
              isActive
                ? 'bg-[var(--sidebar-active)] font-medium text-[var(--sidebar-active-fg)]'
                : 'text-[var(--sidebar-fg-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-fg)]',
            )
          }
        >
          <Settings className="h-4 w-4 shrink-0" />
          {!sidebarCollapsed && settingsNavItem.label}
        </NavLink>

        {!sidebarCollapsed && user?.email && (
          <p className="truncate px-3 pt-1 text-xs text-[var(--sidebar-fg-muted)]">{user.email}</p>
        )}
        <button
          type="button"
          onClick={handleLogout}
          title={sidebarCollapsed ? 'Déconnexion' : undefined}
          className={cn(
            'flex w-full items-center gap-3 rounded-[var(--radius-md)] text-sm text-danger/80 transition-colors hover:bg-[var(--sidebar-hover)] hover:text-danger',
            sidebarCollapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2',
          )}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!sidebarCollapsed && 'Déconnexion'}
        </button>
      </div>
    </aside>
  );
}
