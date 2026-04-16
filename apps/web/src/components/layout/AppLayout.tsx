import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { cn } from '@/lib/cn';
import { useAppStore } from '@/stores/app.store';
import { useAuthStore } from '@/stores/auth.store';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { SearchCommand } from './search-command';

export function AppLayout() {
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed);
  const { fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar />
      <div
        className={cn(
          'transition-[margin] duration-200',
          sidebarCollapsed ? 'ml-16' : 'ml-56',
        )}
      >
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
      <SearchCommand />
    </div>
  );
}
