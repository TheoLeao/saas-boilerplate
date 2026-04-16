import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

async function fetchHealth(): Promise<Record<string, unknown>> {
  const res = await fetch('/api/health');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function SystemHealthPage() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
    refetchInterval: 30_000,
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-text-muted">
          Endpoint public <code className="text-primary">GET /api/health</code>
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-[var(--radius-md)] border border-border bg-bg-card px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-border-hover hover:text-text"
        >
          {isFetching ? '…' : 'Rafraîchir'}
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Réponse</CardTitle>
          <CardDescription>JSON renvoyé par l’API</CardDescription>
        </CardHeader>
        {isLoading && (
          <div className="h-24 animate-pulse rounded-md bg-bg-hover" />
        )}
        {isError && (
          <p className="text-sm text-danger">
            {error instanceof Error ? error.message : 'Erreur'}
          </p>
        )}
        {data && (
          <pre className="max-h-96 overflow-auto rounded-md border border-border bg-bg p-4 text-xs text-text">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </Card>
    </div>
  );
}
