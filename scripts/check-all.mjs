#!/usr/bin/env node
/**
 * Quality gate — lancé automatiquement par .git/hooks/pre-push
 * Peut aussi être lancé manuellement via `npm run check-all`
 */
import { execSync } from 'child_process';

const G = '\x1b[32m';
const R = '\x1b[31m';
const Y = '\x1b[33m';
const B = '\x1b[1m';
const X = '\x1b[0m';

const steps = [
  { name: 'Format (Prettier)', cmd: 'npm run format:check' },
  { name: 'TypeScript',        cmd: 'npx tsc --noEmit' },
  { name: 'Tests unitaires',   cmd: 'npm run test' },
  { name: 'Tests E2E',         cmd: 'npm run test:e2e' },
];

console.log(`\n${B}▶ Quality gate — ${steps.length} checks avant push${X}\n`);

const results = [];
let allPassed = true;

for (const step of steps) {
  console.log(`${Y}──${X} ${step.name}…`);
  const t = Date.now();
  try {
    execSync(step.cmd, { stdio: 'inherit', cwd: process.cwd() });
    const s = ((Date.now() - t) / 1000).toFixed(1);
    console.log(`${G}✓${X} ${step.name} ${Y}(${s}s)${X}\n`);
    results.push({ name: step.name, passed: true, s });
  } catch {
    const s = ((Date.now() - t) / 1000).toFixed(1);
    console.log(`\n${R}✗${X} ${step.name} a échoué (${s}s)\n`);
    results.push({ name: step.name, passed: false, s });
    allPassed = false;
    break;
  }
}

console.log(`${B}── Bilan ──────────────────────────────────────${X}`);
for (const r of results) {
  console.log(`  ${r.passed ? `${G}✓${X}` : `${R}✗${X}`} ${r.name} (${r.s}s)`);
}

if (!allPassed) {
  console.log(`\n${R}${B}✗ Push bloqué — corrige les erreurs ci-dessus.${X}\n`);
  process.exit(1);
} else {
  console.log(`\n${G}${B}✓ Tous les checks passent — push autorisé.${X}\n`);
}
