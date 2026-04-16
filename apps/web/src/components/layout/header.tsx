import { useLocation } from 'react-router';
import { Bell, ChevronRight, Search } from 'lucide-react';
import { resolvePageMeta } from '@/config/nav';

export function Header() {
  const { pathname } = useLocation();
  const page = resolvePageMeta(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[var(--shell-border)] bg-bg/80 px-6 backdrop-blur-sm">
      <div>
        <div className="mb-0.5 flex items-center gap-1.5 text-xs text-text-muted">
          {page.breadcrumb.map((crumb, i) => (
            <span key={`${crumb}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              <span
                className={
                  i === page.breadcrumb.length - 1 ? 'text-text-muted' : ''
                }
              >
                {crumb}
              </span>
            </span>
          ))}
        </div>
        <h1 className="text-lg font-semibold leading-tight text-text">{page.title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            window.dispatchEvent(
              new KeyboardEvent('keydown', { key: 'k', metaKey: true }),
            )
          }
          className="flex h-8 w-56 items-center gap-2 rounded-[var(--radius-md)] border border-border bg-bg-card px-3 text-sm text-text-muted transition-colors hover:border-border-hover"
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1 text-left">Rechercher…</span>
          <kbd className="rounded border border-border px-1 py-0.5 text-[10px] text-text-muted">
            ⌘K
          </kbd>
        </button>

        <button
          type="button"
          className="relative rounded-[var(--radius-md)] p-2 text-text-muted transition-colors hover:bg-bg-hover hover:text-text"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </button>
      </div>
    </header>
  );
}
