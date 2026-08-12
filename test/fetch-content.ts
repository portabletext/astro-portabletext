import fs from 'node:fs'
import {fileURLToPath} from 'node:url'

import {type CheerioAPI, load} from 'cheerio'

/**
 * Loads a page from the built fixture site (`test/dist`) and returns a Cheerio
 * instance for asserting on the rendered HTML. `path` is the page route, e.g.
 * `block/h1` or `mark/link`.
 */
export async function fetchContent(path: string): Promise<CheerioAPI> {
  const url = new URL(`./dist/${path}/index.html`, import.meta.url)
  const content = await fs.promises.readFile(fileURLToPath(url), 'utf8')

  return load(content)
}
