import { Outlet, Navigate } from 'react-router';
import { useAuthStore } from '@/stores/auth.store';

export function AuthLayout() {
  const { user } = useAuthStore();

  if (user) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
