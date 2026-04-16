import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { FileText, Sparkles } from 'lucide-react';

const blocks = [
  {
    title: 'Documentation produit',
    description:
      'Architecture, runbooks et ADR vivent dans le dossier docs/ du monorepo.',
    icon: FileText,
    paths: ['docs/README.md', 'docs/architecture/', 'docs/runbooks/'],
  },
  {
    title: 'Skills IA',
    description:
      'Instructions pour agents (Cursor, Claude Code) : skills/ avec registry.yml.',
    icon: Sparkles,
    paths: ['skills/README.md', 'skills/registry.yml'],
  },
];

export function DocsHubPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
      <p className="text-sm text-text-muted">
        Point d’entrée vers la doc du dépôt (hors build Vite). Ouvre ces chemins
        dans ton éditeur ou sur GitHub.
      </p>

      <div className="space-y-4">
        {blocks.map(({ title, description, icon: Icon, paths }) => (
          <Card key={title}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <CardTitle>{title}</CardTitle>
              </div>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <ul className="list-inside list-disc space-y-1 text-sm text-text-muted">
              {paths.map((p) => (
                <li key={p}>
                  <code className="text-text">{p}</code>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
