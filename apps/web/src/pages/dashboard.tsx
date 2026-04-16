import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/auth.store';

export function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6 animate-fade-in">
      <p className="text-sm text-text-muted">
        Bienvenue
        {user?.firstName ? `, ${user.firstName}` : ''}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Revenu" value="0 €" description="MRR" />
        <StatCard title="Utilisateurs" value="0" description="Inscrits" />
        <StatCard title="Actifs" value="0" description="30 derniers jours" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Démarrage</CardTitle>
          <CardDescription>
            Boilerplate SaaS — ajoute ton métier ici.
          </CardDescription>
        </CardHeader>
        <ul className="space-y-2 text-sm text-text-muted">
          <li>
            • Modules API dans{' '}
            <code className="text-primary">apps/api/src/</code>
          </li>
          <li>
            • Pages dans{' '}
            <code className="text-primary">apps/web/src/pages/</code> + entrées{' '}
            <code className="text-primary">config/nav.tsx</code>
          </li>
          <li>
            • Schéma Prisma :{' '}
            <code className="text-primary">apps/api/prisma/schema.prisma</code>
          </li>
          <li>• Paiements : Stripe + @theoleao/stripe-helpers</li>
          <li>• Emails : @theoleao/messaging</li>
        </ul>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
}: {
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
