import {defineConfig} from 'astro/config'

// Minimal static Astro project used as a rendering fixture for the test suite.
// `pnpm test` builds this to `test/dist` (via global-setup) and asserts on the HTML.
export default defineConfig({})
