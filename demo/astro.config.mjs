import {defineConfig} from 'astro/config'

// When deploying to GitHub Pages the site is served from a repo sub-path.
// `PAGES_DEPLOY` is set by the deploy workflow so local dev/builds stay at `/`.
const base = process.env.PAGES_DEPLOY ? '/astro-portabletext' : undefined

export default defineConfig({
  site: 'https://portabletext.github.io',
  base,
})
