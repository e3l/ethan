// Keeps gallery photos to one spec: JPEG, long edge <= LONG_EDGE, no EXIF/XMP.
//   npm run photos             fix photos not to spec (compliant ones are skipped)
//   npm run photos -- --check  list them and exit 1 (runs as prebuild)

import { readdirSync, statSync, unlinkSync, renameSync } from 'node:fs'
import { join, extname, relative } from 'node:path'
import sharp from 'sharp'

const ROOT = 'components/gallery'
const LONG_EDGE = 2560
const QUALITY = 85

const IMAGE = /\.(png|jpe?g|webp|tiff?)$/i
const JPEG = /\.jpe?g$/

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return walk(path)
    return IMAGE.test(name) ? [path] : []
  })
}

async function problems(path) {
  const meta = await sharp(path).metadata()
  const found = []
  if (!JPEG.test(extname(path))) found.push(`not a lowercase .jpg/.jpeg (${extname(path)})`)
  const edge = Math.max(meta.width, meta.height)
  if (edge > LONG_EDGE) found.push(`long edge ${edge}px > ${LONG_EDGE}px`)
  if (meta.exif || meta.xmp) found.push('carries EXIF/XMP metadata')
  return found
}

async function optimise(path) {
  const image = sharp(path)
  const meta = await image.metadata()
  if (meta.hasAlpha && !(await image.stats()).isOpaque) {
    throw new Error(`${path} uses transparency, which a JPEG cannot keep`)
  }

  const ext = extname(path)
  const target = JPEG.test(ext) ? path : path.slice(0, -ext.length) + '.jpg'
  const temp = target + '.tmp'

  const before = statSync(path).size
  const info = await sharp(path)
    .rotate()
    .resize({ width: LONG_EDGE, height: LONG_EDGE, fit: 'inside', withoutEnlargement: true })
    .keepIccProfile()
    .jpeg({ quality: QUALITY, chromaSubsampling: '4:4:4', mozjpeg: true })
    .toFile(temp)

  if (target !== path) unlinkSync(path)
  renameSync(temp, target)

  const kb = (n) => `${Math.round(n / 1024)} KB`
  console.log(`${relative(ROOT, path)} -> ${relative(ROOT, target)}  ${kb(before)} -> ${kb(info.size)}  ${info.width}x${info.height}`)
  return target !== path ? target : null
}

const check = process.argv.includes('--check')
const failing = []
for (const path of walk(ROOT)) {
  const found = await problems(path)
  if (found.length) failing.push({ path, found })
}

if (check) {
  if (failing.length === 0) {
    console.log(`photos: all ${walk(ROOT).length} gallery photos are to spec`)
    process.exit(0)
  }
  console.error(`photos: ${failing.length} gallery photo(s) not to spec; run \`npm run photos\`:`)
  for (const { path, found } of failing) console.error(`  ${path}: ${found.join(', ')}`)
  process.exit(1)
}

if (failing.length === 0) {
  console.log('photos: nothing to do, every gallery photo is to spec')
  process.exit(0)
}

const renamed = []
for (const { path } of failing) {
  const target = await optimise(path)
  if (target) renamed.push(target)
}
if (renamed.length) {
  console.log(`\n${renamed.length} photo(s) changed extension; update their imports:`)
  for (const path of renamed) console.log(`  ${path}`)
}
