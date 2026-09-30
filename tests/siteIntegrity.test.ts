import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const SRC = join(process.cwd(), 'src');

function listFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

const sourceFiles = listFiles(SRC).filter((file) => /\.(ts|tsx)$/.test(file));

/** App Router routes as regexes: route groups dropped, [param] matches one segment. */
const routePatterns = sourceFiles
  .filter((file) => /[\\/]page\.tsx$/.test(file))
  .map((file) => {
    const segments = relative(join(SRC, 'app'), file)
      .split(sep)
      .slice(0, -1)
      .filter((segment) => !/^\(.*\)$/.test(segment));
    const pattern = segments
      .map((segment) => (/^\[.*\]$/.test(segment) ? '[^/]+' : segment.replace(/[.*+?^$(){}|\\]/g, '\\$&')))
      .join('/');
    return new RegExp(`^/${pattern}$`);
  });

/** Internal links written in the source: href="/x", href={`/x/${y}`}, path: '/x', router.push('/x'). */
function internalLinks(): { file: string; href: string }[] {
  const linkPattern =
    /(?:href=\{?|href:\s*|path:\s*|router\.push\(|window\.open\()\s*(["'`])(\/[^"'`\s?#]*)\1?/g;
  return sourceFiles.flatMap((file) => {
    const text = readFileSync(file, 'utf8');
    return [...text.matchAll(linkPattern)].map((match) => ({
      file: relative(process.cwd(), file),
      href: match[2].replace(/\$\{[^}]*\}/g, 'x').replace(/\/$/, '') || '/',
    }));
  });
}

test('every internal link in the source points to an existing route', () => {
  const links = internalLinks();
  assert.ok(links.length > 20, 'expected to find the site navigation links');
  const broken = links.filter(({ href }) => !routePatterns.some((route) => route.test(href)));
  assert.deepEqual(broken, [], `Links without a matching page.tsx:\n${broken.map((b) => `${b.file}: ${b.href}`).join('\n')}`);
});

test('source files contain no mojibake (UTF-8 text decoded as Windows-1252)', () => {
  const mojibake = /Ã[\u0080-¿]|â€|â†|âœ|Â[ -¿]/;
  const corrupted = sourceFiles.filter((file) => mojibake.test(readFileSync(file, 'utf8')));
  assert.deepEqual(corrupted.map((file) => relative(process.cwd(), file)), []);
});

test('source files have no UTF-8 byte order mark', () => {
  const withBom = sourceFiles.filter((file) => readFileSync(file).subarray(0, 3).equals(Buffer.from([0xef, 0xbb, 0xbf])));
  assert.deepEqual(withBom.map((file) => relative(process.cwd(), file)), []);
});
