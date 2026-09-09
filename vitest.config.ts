import {fileURLToPath} from 'node:url'

import {getViteConfig} from 'astro/config'
import {defineConfig} from 'vitest/config'

// `getViteConfig` gives the test run Astro's own Vite pipeline, so `.astro`
// components can be imported and rendered with the container API. It points
// Vite's root at the fixture site, so pin the test root back to this package.
export default getViteConfig(
  defineConfig({
    test: {
      root: fileURLToPath(new URL('.', import.meta.url)),
      globalSetup: ['./test/global-setup.ts'],
      include: ['test/**/*.test.ts'],
    },
  }),
  {root: './test'},
)
