// Converts gallery photos to JPEG with a long edge of at most LONG_EDGE, keeping
// the repo small. Originals belong in a photo library.
//   npm run photos             convert the photos that need it
//   npm run photos -- --check  list them and exit 1 (runs as prebuild)

import { existsSync, readdirSync, renameSync, statSync, unlinkSync } from 'node:fs'
import { extname, join } from 'node:path'
import sharp from 'sharp'

const ROOT = 'components/gallery'
const LONG_EDGE = 2560
const QUALITY = 85

// Lowercase only: Turbopack matches loaders on the literal extension.
const JPEG = /\.jpe?g$/

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return walk(path)
    return /\.(png|jpe?g|webp|tiff?)$/i.test(name) ? [path] : []
  })
}

async function needsConverting(path) {
  if (!JPEG.test(extname(path))) return true
  const { width, height } = await sharp(path).metadata()
  return Math.max(width, height) > LONG_EDGE
}

async function convert(path) {
  const ext = extname(path)
  const target = JPEG.test(ext) ? path : path.slice(0, -ext.length) + '.jpg'
  if (target.toLowerCase() !== path.toLowerCase() && existsSync(target)) {
    throw new Error(`${target} already exists; not overwriting it with ${path}`)
  }

  await sharp(path)
    .rotate()
    .resize({ width: LONG_EDGE, height: LONG_EDGE, fit: 'inside', withoutEnlargement: true })
    .keepIccProfile()
    .jpeg({ quality: QUALITY, chromaSubsampling: '4:4:4', mozjpeg: true })
    .toFile(target + '.tmp')

  if (target !== path) unlinkSync(path)
  renameSync(target + '.tmp', target)
  console.log(`${path} -> ${target}`)
}

const photos = walk(ROOT)
const pending = []
for (const path of photos) if (await needsConverting(path)) pending.push(path)

if (process.argv.includes('--check')) {
  if (pending.length > 0) {
    console.error(`photos: run \`npm run photos\` to convert:\n  ${pending.join('\n  ')}`)
    process.exit(1)
  }
  console.log(`photos: all ${photos.length} gallery photos are to spec`)
} else {
  for (const path of pending) await convert(path)
  if (pending.some((path) => !JPEG.test(extname(path)))) {
    console.log('Update the imports of photos whose extension changed.')
  }
}
