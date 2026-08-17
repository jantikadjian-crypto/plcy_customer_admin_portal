import { useState } from 'react';
import { Info, X, AlertTriangle, CircleAlert, GitCompareArrows, Lightbulb } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { devNotes } from '../devNotes/content.js';

/**
 * Floating "Dev Notes" button + slide-over panel.
 *
 * Content comes from src/app/devNotes/content.js — the same module that generates
 * docs/PLCY_customer_admin_portal-developer-notes.md, so the two cannot drift.
 *
 * Gating: `import.meta.env.DEV` only. Vite statically replaces this with `false`
 * in production builds, so the guard in App.tsx plus the guard below let Rollup
 * drop this component and its content from the production bundle entirely.
 * There is deliberately no role-based override — no role mechanism exists yet.
 */

const TONE: Record<string, { label: string; cls: string; Icon: typeof Info }> = {
  info: { label: 'Note', cls: 'border-blue-200 bg-blue-50 text-blue-900', Icon: Lightbulb },
  warn: { label: 'Important', cls: 'border-amber-200 bg-amber-50 text-amber-900', Icon: AlertTriangle },
  gap: { label: 'Gap', cls: 'border-orange-200 bg-orange-50 text-orange-900', Icon: CircleAlert },
  mismatch: {
    label: 'Mismatch',
    cls: 'border-red-200 bg-red-50 text-red-900',
    Icon: GitCompareArrows,
  },
};

function Block({ block }: { block: any }) {
  switch (block.kind) {
    case 'para':
      return <p className="text-sm leading-relaxed text-muted-foreground">{block.text}</p>;

    case 'list':
      return (
        <ul className="space-y-1.5">
          {block.items.map((item: string, i: number) => (
            <li key={i} className="text-sm leading-relaxed text-muted-foreground flex gap-2">
              <span className="text-muted-foreground/50 shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case 'table':
      return (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-xs">
            <thead className="bg-muted/50">
              <tr>
                {block.headers.map((h: string) => (
                  <th key={h} className="text-left font-medium px-3 py-2 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {block.rows.map((row: string[], i: number) => (
                <tr key={i} className="align-top">
                  {row.map((c, j) => (
                    <td
                      key={j}
                      className={`px-3 py-2 ${j === 0 ? 'font-medium' : 'text-muted-foreground'}`}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case 'rule':
      return (
        <div className="rounded-lg border p-3 space-y-2">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <h4 className="text-sm font-semibold">{block.name}</h4>
            <div className="flex gap-1 flex-wrap">
              {block.placeholder && (
                <Badge
                  variant="outline"
                  className="text-[10px] bg-amber-500/10 text-amber-700 border-amber-500/20"
                >
                  placeholder values
                </Badge>
              )}
              <Badge
                variant="outline"
                className={`text-[10px] ${
                  block.source
                    ? 'bg-green-500/10 text-green-700 border-green-500/20'
                    : 'bg-red-500/10 text-red-700 border-red-500/20'
                }`}
              >
                {block.source ? 'implemented' : 'not implemented'}
              </Badge>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{block.rule}</p>
          <p className="text-xs leading-relaxed bg-muted/50 rounded p-2">
            <span className="font-medium">Example: </span>
            <span className="text-muted-foreground">{block.example}</span>
          </p>
          {block.source && (
            <p className="text-[11px] font-mono text-muted-foreground/80 break-all">
              {block.source}
            </p>
          )}
        </div>
      );

    case 'callout': {
      const tone = TONE[block.tone] ?? TONE.info;
      const { Icon } = tone;
      return (
        <div className={`rounded-lg border p-3 ${tone.cls}`}>
          <div className="flex items-center gap-2 mb-1">
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span className="text-xs font-semibold uppercase tracking-wide">{tone.label}</span>
            <span className="text-sm font-semibold">— {block.title}</span>
          </div>
          <p className="text-sm leading-relaxed opacity-90">{block.text}</p>
        </div>
      );
    }

    default:
      return null;
  }
}

export function DevNotesLauncher() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(devNotes.sections[0].id);

  // Belt-and-braces: even if this were rendered unguarded, it stays off in prod.
  // Placed after the hooks so the hook order is unconditional.
  if (!import.meta.env.DEV) return null;

  const section =
    devNotes.sections.find((s) => s.id === activeSection) ?? devNotes.sections[0];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Dev Notes (development build only)"
        aria-label="Open developer notes"
        className="fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full bg-slate-900 text-white shadow-lg hover:bg-slate-800 hover:scale-105 transition-all flex items-center justify-center"
      >
        <Info className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          <aside
            role="dialog"
            aria-label="Developer notes"
            className="relative bg-background w-full max-w-3xl h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200"
          >
            <header className="border-b p-4 flex items-start justify-between gap-4 shrink-0">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-semibold">{devNotes.title} — Dev Notes</h2>
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-slate-900 text-white border-slate-900"
                  >
                    dev build only
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Updated {devNotes.updated} · source of truth:{' '}
                  <code className="font-mono">src/app/devNotes/content.js</code>
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)} aria-label="Close">
                <X className="w-4 h-4" />
              </Button>
            </header>

            <div className="flex flex-1 min-h-0">
              <nav className="w-48 border-r p-2 overflow-y-auto shrink-0 bg-muted/20">
                {devNotes.sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`w-full text-left text-xs px-2.5 py-2 rounded-md transition-colors ${
                      s.id === activeSection
                        ? 'bg-background font-medium shadow-sm'
                        : 'text-muted-foreground hover:bg-background/60'
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </nav>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  {section.blurb && (
                    <p className="text-xs text-muted-foreground mt-0.5">{section.blurb}</p>
                  )}
                </div>
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
