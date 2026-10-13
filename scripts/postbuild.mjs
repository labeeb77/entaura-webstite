// Writes dist/<page>.html for every route so the .html URLs resolve on plain
// static hosting (S3/CloudFront) with the right <head> for each page.
import { readFile, writeFile } from 'node:fs/promises'
import { metaTags, pageMeta } from '../src/data/pageMeta.js'

const dist = new URL('../dist/', import.meta.url)
const template = await readFile(new URL('index.html', dist), 'utf8')
const block = /<!-- page-meta -->[\s\S]*?<!-- \/page-meta -->/
if (!block.test(template)) throw new Error('page-meta markers not found in dist/index.html')

const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

for (const meta of Object.values(pageMeta)) {
  const lines = metaTags
    .filter(([key]) => meta[key] !== undefined)
    .map(([key, tag, idAttr, idValue, valueAttr]) => `<${tag} ${idAttr}="${idValue}" ${valueAttr}="${escape(meta[key])}">`)
  lines.push(`<title>${escape(meta.title)}</title>`)
  await writeFile(new URL(meta.file, dist), template.replace(block, () => lines.join('\n    ')))
}
