# PLCY — Customer Admin Portal

The customer-facing admin portal for the PLCY AI governance platform: **Assess • Control • Prove**.

Recreated from the Figma Make export (`PLCY.app`) as a runnable Vite + React + TypeScript app.

## Quick start

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3002.

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server on port 3002 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | `tsc --noEmit` |

## Stack

- **React 18.3** + **TypeScript**, bundled by **Vite 6**
- **Tailwind CSS v4** (via `@tailwindcss/vite`, no `tailwind.config.js` — theme lives in CSS)
- **shadcn/ui** component layer over **Radix UI** primitives (`src/app/components/ui/`)
- **lucide-react** icons, **recharts** charts, **motion** animation, **sonner** toasts

## Layout

```
src/
  main.tsx                     # entry — mounts App, imports styles/index.css
  styles/
    index.css                  # Tailwind entry; imports default_theme + globals
    globals.css                # design tokens (light + dark), @theme inline mapping
  imports/                     # brand assets (PLCY logo)
  app/
    App.tsx                    # shell: sidebar nav, header, tab -> page switch
    components/                # one module per portal page (+ shared dialogs/wizards)
      ui/                      # shadcn/ui primitives
      figma/                   # ImageWithFallback
docs/                          # design + implementation notes carried over from the export
```

Navigation is **state-driven, not URL-driven**: `App.tsx` holds an `activeTab` string and
`renderContent()` switches on it. There is no router — adding a page means adding an entry to
`authenticatedNavigationGroups` and a `case` in `renderContent()`.

## Portal pages

Grouped exactly as the sidebar presents them:

| Group | Pages |
| --- | --- |
| Home | Dashboard, Onboarding |
| AI Systems | AI Inventory, Workflows & Agents, Data Flows |
| Policies & Controls | Policy Packs, Control Library, Risk & Compliance |
| Tests & Evaluations | Threat Modeling, LLM Security Testing |
| Approvals & Incidents | Approval Inbox, Change Approvals, Human-in-the-Loop |
| Evidence & Trust | Reports, Audit & Logs, Evidence Vault, My Trust Center |
| Settings | Users & Teams, Integrations, Settings, My Account |

Drilling into an AI system from the inventory swaps the whole content area for
`AISystemDrillDown` until you navigate back.

## Data

All data is **in-component demo fixtures** — there is no API layer, database, or auth backend.
`App.tsx` starts with `isAuthenticated = true` and a hardcoded `Demo Company` user, so the app
boots straight into the authenticated dashboard. The `AuthenticationModal` and the public
marketing view exist and work, but nothing is persisted.

Wiring this to real services means replacing the fixture constants inside each module and
giving `isAuthenticated` / `currentUser` a real session source.

## Changes made to the Figma export

The raw export does not build. Fixes applied while porting:

1. **Versioned import specifiers stripped** — the export writes
   `from "lucide-react@0.487.0"`, `from "@radix-ui/react-slot@1.1.2"`, etc., which no bundler
   resolves. Rewritten to bare specifiers across 68 files; versions are pinned in
   `package.json` instead.
2. **Six dangling imports removed from `App.tsx`** — `RiskAssessmentModule`,
   `DataGovernancePage`, `HumanInTheLoopModule`, `SupervisorManagementPage`,
   `ComplianceMatrix`, and `TrustCenterBuilder` were imported but shipped no source files.
   All six were unused by `renderContent()`, so removing the imports changes no behavior.
3. **`motion` added as a dependency** — used by 11 components via `motion/react`.
4. **Real project config added** — `package.json` with react/react-dom as actual dependencies
   (the export marked them optional peers), `tsconfig.json`, a `figma:asset` resolver-free
   `vite.config.ts`, and a clean `index.html`.

## Notes

- The production bundle is a single ~1.9 MB chunk (~450 kB gzipped). Every page module is
  statically imported by `App.tsx`; route-level `React.lazy` would be the first win if load
  time starts to matter.
- Dark mode tokens are defined in `globals.css` under `.dark`, but nothing toggles the class
  yet — the portal renders light-only today.
