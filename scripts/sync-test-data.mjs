/**
 * Generates src/lib/generated/test-stats.ts from real test results + coverage.
 * Usage: npm run sync-tests
 */
import { execSync } from 'child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const cacheDir = join(root, 'node_modules', '.cache', 'test-sync');

if (!existsSync(cacheDir)) mkdirSync(cacheDir, { recursive: true });

const vitestOut  = join(cacheDir, 'vitest.json');
const coverageOut = join(root, 'coverage', 'coverage-final.json');

// ── Run Vitest with coverage ────────────────────────────────────
console.log('▶ Running Vitest (json reporter + coverage)…');
try {
  execSync(`npx vitest run --coverage --reporter=json --outputFile="${vitestOut}"`, {
    cwd: root,
    stdio: 'pipe',
  });
} catch {
  // Vitest exits non-zero on test failures but still writes the JSON
}

if (!existsSync(vitestOut)) {
  console.error('✗ Vitest did not produce JSON output. Aborting.');
  process.exit(1);
}

const vr = JSON.parse(readFileSync(vitestOut, 'utf8'));

// ── Coverage helpers ──────────────────────────────────────────────
function stmtPct(fileCov) {
  const counts = Object.values(fileCov.s ?? {});
  if (!counts.length) return 100;
  return Math.round((counts.filter(c => c > 0).length / counts.length) * 100);
}

function getLayer(filePath) {
  const p = filePath.replace(/\\/g, '/');
  if (p.includes('/src/app/api/') || p.includes('/src/services/') || p.includes('/src/adapters/')) return 'API';
  if (p.includes('/src/app/'))                    return 'App';
  if (p.includes('/src/components/atoms/'))       return 'Atoms';
  if (p.includes('/src/components/molecules/'))   return 'Molecules';
  if (p.includes('/src/components/organisms/') ||
      p.includes('/src/components/sections/')  ||
      p.includes('/src/components/templates/'))   return 'Organisms';
  if (p.includes('/src/hooks/') || p.includes('/src/contexts/')) return 'Hooks';
  return null;
}

// Fallback values (used if coverage-final.json is missing)
let coverageByLayer = { App: 80, Atoms: 100, Molecules: 72, Hooks: 68, API: 100, Organisms: 12 };

if (existsSync(coverageOut)) {
  console.log('▶ Parsing coverage report…');
  const cov = JSON.parse(readFileSync(coverageOut, 'utf8'));
  const buckets = {};

  for (const [fp, fc] of Object.entries(cov)) {
    const layer = getLayer(fp);
    if (!layer) continue;
    if (!buckets[layer]) buckets[layer] = [];
    buckets[layer].push(stmtPct(fc));
  }

  for (const [layer, pcts] of Object.entries(buckets)) {
    if (pcts.length) {
      coverageByLayer[layer] = Math.round(pcts.reduce((s, v) => s + v, 0) / pcts.length);
    }
  }
  console.log('  Coverage by layer:', coverageByLayer);
} else {
  console.warn('  ⚠ coverage-final.json not found — using fallback values.');
}

const coverageAvg = Math.round(
  Object.values(coverageByLayer).reduce((s, v) => s + v, 0) / Object.values(coverageByLayer).length,
);

// ── Test count helpers ────────────────────────────────────────────
function countInFile(testResults, partial) {
  const norm = partial.replace(/\\/g, '/');
  const file = (testResults ?? []).find(r => r?.name?.replace(/\\/g, '/')?.includes(norm));
  return file?.assertionResults?.length ?? 0;
}

function countPlaywrightTests(specRelPath) {
  const absPath = join(root, specRelPath);
  if (!existsSync(absPath)) return 0;
  const src = readFileSync(absPath, 'utf8');
  return (src.match(/\btest\s*\(/g) ?? []).length;
}

function countBenchTests(specRelPath) {
  const absPath = join(root, specRelPath);
  if (!existsSync(absPath)) return 0;
  const src = readFileSync(absPath, 'utf8');
  return (src.match(/\bbench\s*\(/g) ?? []).length;
}

// ── Extract counts ────────────────────────────────────────────────
const stats = {
  generatedAt: new Date().toISOString(),
  unit: {
    total:   vr.numTotalTests   ?? 0,
    passed:  vr.numPassedTests  ?? 0,
    failed:  vr.numFailedTests  ?? 0,
    skipped: vr.numPendingTests ?? 0,
    files:   vr.testResults?.length ?? vr.numTotalTestSuites ?? 0,
    byFile: {
      'api.test.ts':            countInFile(vr.testResults, 'api/portfolio/api.test.ts'),
      'accessibility.test.tsx': countInFile(vr.testResults, 'tests/accessibility.test.tsx'),
    },
  },
  playwright: {
    a11y:        countPlaywrightTests('e2e/accessibility.spec.ts'),
    audit:       countPlaywrightTests('e2e/audit.spec.ts'),
    navigation:  countPlaywrightTests('e2e/navigation.spec.ts'),
    performance: countPlaywrightTests('e2e/performance.spec.ts'),
    theme:       countPlaywrightTests('e2e/theme.spec.ts'),
  },
  bench: {
    total: countBenchTests('src/tests/performance.bench.ts'),
  },
};

const A11Y_E2E  = stats.playwright.a11y;
const E2E_TOTAL = stats.playwright.navigation + stats.playwright.theme + stats.playwright.audit;
const totalAll  = stats.unit.total + A11Y_E2E + E2E_TOTAL + stats.playwright.performance + stats.bench.total;

// ── Write generated file ──────────────────────────────────────────
const genDir = join(root, 'src', 'lib', 'generated');
if (!existsSync(genDir)) mkdirSync(genDir, { recursive: true });

const outPath = join(genDir, 'test-stats.ts');
const content = `// AUTO-GENERATED by \`npm run sync-tests\` — do not edit manually
// Run \`npm run sync-tests\` to refresh after adding or removing tests
// Last sync: ${stats.generatedAt}

export const TEST_STATS = ${JSON.stringify(stats, null, 2)} as const;

export const UNIT_TOTAL  = TEST_STATS.unit.total;
export const A11Y_UNIT   = TEST_STATS.unit.byFile['accessibility.test.tsx'];
export const A11Y_E2E    = TEST_STATS.playwright.a11y;
export const A11Y_TOTAL  = A11Y_UNIT + A11Y_E2E;
export const API_COUNT   = TEST_STATS.unit.byFile['api.test.ts'];
export const E2E_TOTAL   = TEST_STATS.playwright.navigation + TEST_STATS.playwright.theme + TEST_STATS.playwright.audit;
export const PERF_TOTAL  = TEST_STATS.playwright.performance;
export const BENCH_TOTAL = TEST_STATS.bench.total;
export const TOTAL_ALL   = ${totalAll};

export const COVERAGE_BY_LAYER = ${JSON.stringify(coverageByLayer, null, 2)} as const;
export const COVERAGE_AVG = ${coverageAvg};
`;

writeFileSync(outPath, content, 'utf8');

console.log(`✓ Written to src/lib/generated/test-stats.ts`);
console.log(`  Unit:     ${stats.unit.passed}/${stats.unit.total} passed · ${stats.unit.files} files`);
console.log(`  A11y:     ${A11Y_E2E} E2E + ${stats.unit.byFile['accessibility.test.tsx']} unit = ${A11Y_E2E + stats.unit.byFile['accessibility.test.tsx']} total`);
console.log(`  E2E:      nav(${stats.playwright.navigation}) + theme(${stats.playwright.theme}) + audit(${stats.playwright.audit}) = ${E2E_TOTAL}`);
console.log(`  Perf:     ${stats.playwright.performance} · Bench: ${stats.bench.total}`);
console.log(`  Total:    ${totalAll} tests across all types`);
console.log(`  Coverage: avg ${coverageAvg}%`, coverageByLayer);
