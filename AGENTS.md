# AGENTS.md

## Cursor Cloud specific instructions

`@portabletext/astro` is a single-package Astro component library for rendering
[Portable Text](https://portabletext.org). There is no backend or external
service; the only runnable "app" is the demo Astro site under `demo/`.

- Package manager is `pnpm` (see `packageManager` in `package.json`); dependencies are
  installed by the startup update script, so you normally don't need to run `pnpm install` yourself.
- The library is consumed via Node package **self-referencing**: source/test/demo files import
  `@portabletext/astro`, `@portabletext/astro/components`, `@portabletext/astro/types` etc., which
  resolve through the `exports` map in `package.json` (no `node_modules/@portabletext/astro`
  symlink exists, and that is expected). Only the subpaths listed in `exports` are importable via
  the package name.

### Commands (defined in `package.json` scripts)

- Dev server (the demo app): `pnpm dev` — runs `astro dev --root demo`, serves on `http://localhost:4321/`.
- Build the demo: `pnpm build:demo` (runs `pnpm clean` first).
- Lint: `pnpm lint` (oxlint). Format: `pnpm format` (oxfmt).
- Type-check: `pnpm type-check` (`astro check`).
- Tests: `pnpm test` (vitest). Note: the vitest global setup (`test/global-setup.ts`) first runs
  `astro build --root test` to build fixture pages into `test/dist/`, then the `*.test.ts` files
  assert against the generated HTML with cheerio. A broken fixture page will fail the whole build
  (and therefore the whole test run) before any assertions execute.
