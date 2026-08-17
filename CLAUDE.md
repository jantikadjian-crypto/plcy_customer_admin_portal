# plcy_customer_admin_portal

PLCY customer admin portal. Vite 6 + React 18 + TypeScript + Tailwind v4 + shadcn/ui.
Ported from a Figma Make export; see README.md for the porting fixes.

## Commands

- `npm run dev` — dev server on **port 3002**
- `npm run build` — production build
- `npm run typecheck` — `tsc --noEmit`
- `npm run devnotes` — regenerate the developer-notes markdown from its source

## Dev notes (single source)

Handover documentation lives in **`src/app/devNotes/content.js`** and nowhere else. Two
consumers render it: `npm run devnotes` writes
`docs/PLCY_customer_admin_portal-developer-notes.md`, and `DevNotesLauncher.tsx` renders the
in-app panel behind the floating info button. **Never hand-edit the generated markdown** —
edit `content.js` and regenerate, or the two will drift.

The launcher is gated on `import.meta.env.DEV` in both `App.tsx` and the component itself.
Vite replaces that with `false` in production, so Rollup drops the component and all notes
content from the shipped bundle. Verified: no notes strings appear in `dist/`. Keep it that
way — do not make the gate dynamic, or the content will start shipping to customers.

## Conventions

- **No router.** `src/app/App.tsx` holds `activeTab` state and `renderContent()` switches on it.
  To add a page: add the file to `src/app/components/`, add an entry to
  `authenticatedNavigationGroups`, and add a `case` to `renderContent()`.
- **Tailwind v4, no config file.** Design tokens live in `src/styles/globals.css` under `:root`
  / `.dark` and are exposed to Tailwind through the `@theme inline` block. Add a new color by
  adding both the raw `--foo` variable and its `--color-foo: var(--foo)` mapping.
- **shadcn/ui primitives live in `src/app/components/ui/`.** Prefer composing these over new
  bespoke markup. Import them relatively (`./ui/button`), matching existing files.
- **Bare import specifiers only.** Never reintroduce Figma's `pkg@version` import style —
  pin versions in `package.json`.
- **Demo data is inline.** Each page module owns its own fixture constants. There is no API
  client, store, or backend.
- Page components are large single files by design (the export's shape). Match the surrounding
  style rather than restructuring a module wholesale.
