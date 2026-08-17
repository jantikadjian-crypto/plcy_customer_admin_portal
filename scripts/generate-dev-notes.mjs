#!/usr/bin/env node
/**
 * Regenerates docs/PLCY_customer_admin_portal-developer-notes.md from the shared
 * dev-notes source at src/app/devNotes/content.js.
 *
 * Run with: npm run devnotes
 *
 * The markdown is a build artefact. Edit content.js, never the .md.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { devNotes } from '../src/app/devNotes/content.js';

const here = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(here, '..', 'docs', 'PLCY_customer_admin_portal-developer-notes.md');

const TONE_LABEL = {
  info: 'Note',
  warn: 'Important',
  gap: 'Gap',
  mismatch: 'Mismatch',
};

/** Escape pipes so table cells never break the markdown table. */
const cell = (s) => String(s).replace(/\|/g, '\\|');

function renderBlock(block) {
  switch (block.kind) {
    case 'para':
      return `${block.text}\n`;

    case 'list':
      return `${block.items.map((i) => `- ${i}`).join('\n')}\n`;

    case 'table': {
      const head = `| ${block.headers.map(cell).join(' | ')} |`;
      const sep = `| ${block.headers.map(() => '---').join(' | ')} |`;
      const body = block.rows.map((r) => `| ${r.map(cell).join(' | ')} |`).join('\n');
      return `${head}\n${sep}\n${body}\n`;
    }

    case 'rule': {
      const tags = [];
      if (block.placeholder) tags.push('`placeholder values`');
      tags.push(block.source ? `\`${block.source}\`` : '**not implemented**');
      return [
        `#### ${block.name}`,
        '',
        block.rule,
        '',
        `*Example:* ${block.example}`,
        '',
        `*Source:* ${tags.join(' · ')}`,
        '',
      ].join('\n');
    }

    case 'callout':
      return `> **${TONE_LABEL[block.tone] ?? 'Note'} — ${block.title}**\n>\n> ${block.text}\n`;

    default:
      throw new Error(`Unknown block kind: ${JSON.stringify(block)}`);
  }
}

const parts = [];

parts.push(`# ${devNotes.title} — Developer Notes`);
parts.push('');
parts.push(
  '<!-- GENERATED FILE — DO NOT EDIT. Source: src/app/devNotes/content.js. Regenerate: npm run devnotes -->',
);
parts.push('');
parts.push(`**Module:** \`${devNotes.module}\`  `);
parts.push(`**Last updated:** ${devNotes.updated}`);
parts.push('');
parts.push(devNotes.summary);
parts.push('');
parts.push('## Contents');
parts.push('');
for (const s of devNotes.sections) {
  parts.push(`- [${s.title}](#${s.id})`);
}
parts.push('');

for (const section of devNotes.sections) {
  parts.push(`<a id="${section.id}"></a>`);
  parts.push('');
  parts.push(`## ${section.title}`);
  parts.push('');
  if (section.blurb) {
    parts.push(`*${section.blurb}*`);
    parts.push('');
  }
  for (const block of section.blocks) {
    parts.push(renderBlock(block));
  }
}

parts.push('---');
parts.push('');
parts.push(
  'Generated from `src/app/devNotes/content.js`. The same source backs the in-app ' +
    'Dev Notes panel (the floating button, visible in dev builds only), so the two can ' +
    'never drift.',
);
parts.push('');

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, parts.join('\n'), 'utf8');

const ruleCount = devNotes.sections
  .flatMap((s) => s.blocks)
  .filter((b) => b.kind === 'rule').length;

console.log(`Wrote ${outPath}`);
console.log(`  ${devNotes.sections.length} sections, ${ruleCount} business rules`);
