/**
 * Shape of the shared dev-notes content.
 *
 * The content itself lives in `content.js` (plain ESM, so both Vite and plain
 * Node can import it) and is rendered by two consumers:
 *   - `scripts/generate-dev-notes.mjs`  -> docs/PLCY_customer_admin_portal-developer-notes.md
 *   - `components/DevNotesLauncher.tsx` -> the in-app Dev Notes panel
 */

export type Tone = 'info' | 'warn' | 'gap' | 'mismatch';

export type Block =
  | { kind: 'para'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'table'; headers: string[]; rows: string[][] }
  | {
      kind: 'rule';
      name: string;
      /** The rule itself, stated precisely. */
      rule: string;
      /** A concrete worked example. */
      example: string;
      /** Where it lives in code, or null when the rule is decided but unbuilt. */
      source: string | null;
      /** True when the value is a demo placeholder rather than intended product policy. */
      placeholder?: boolean;
    }
  | { kind: 'callout'; tone: Tone; title: string; text: string };

export interface Section {
  id: string;
  title: string;
  blurb?: string;
  blocks: Block[];
}

export interface DevNotes {
  module: string;
  title: string;
  updated: string;
  summary: string;
  sections: Section[];
}

export declare const devNotes: DevNotes;
