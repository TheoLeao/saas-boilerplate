import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/auth.store';

export function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-text-muted">
          Welcome back{user?.firstName ? `, ${user.firstName}` : ''}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Revenue" value="$0" description="Monthly recurring" />
        <StatCard title="Users" value="0" description="Total registered" />
        <StatCard title="Active" value="0" description="Last 30 days" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting started</CardTitle>
          <CardDescription>
            This is your SaaS boilerplate. Start building your product here.
          </CardDescription>
        </CardHeader>
        <ul className="space-y-2 text-sm text-text-muted">
          <li>• Add your business logic modules in <code className="text-primary">apps/api/src/</code></li>
          <li>• Create new pages in <code className="text-primary">apps/web/src/routes/</code></li>
          <li>• Update the Prisma schema in <code className="text-primary">apps/api/prisma/schema.prisma</code></li>
          <li>• Configure Stripe for billing</li>
          <li>• Set up email sending with <code className="text-primary">@theoleao/messaging</code></li>
        </ul>
      </Card>
    </div>
  );
}

function StatCard({ title, value, description }: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card>
      <p className="text-sm text-text-muted">{title}</p>
      <p className="mt-1 text-3xl font-bold">{value}</p>
      <p className="mt-1 text-xs text-text-muted">{description}</p>
    </Card>
  );
}
