import {execSync} from 'node:child_process'

/**
 * Builds the Astro fixture site in `test/` to static HTML before the suite runs.
 * The HTML assertion tests then read the output from `test/dist`.
 */
export default function setup(): void {
  execSync('pnpm exec astro build --root test', {stdio: 'inherit'})
}
