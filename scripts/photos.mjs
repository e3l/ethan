// Keeps the gallery's photos at one display-ready spec. Originals belong in a
// photo library; the repo holds these display copies.
//
//   npm run photos             optimise every photo that is not yet to spec
//   npm run photos -- --check  report photos not to spec, change nothing, and
//                              exit non-zero if there are any (run as
//                              `prebuild`, so a stray original fails the build)
//
// A photo is to spec when it is a JPEG, its long edge is at most LONG_EDGE, and
// it carries no EXIF or XMP metadata. Optimising produces exactly that, so a
// photo that has been through it is skipped from then on and never
// recompressed.
//
// Optimising applies the camera's rotation, shrinks the photo to LONG_EDGE
// (never enlarging), keeps its colour profile so wide-gamut (Display P3)
// photos keep their colour, drops all other metadata (camera, location), and
// encodes a JPEG at QUALITY with colour at full resolution (4:4:4). A photo
// that was not a JPEG is replaced by `<name>.jpg`, and its import must be
// updated to match.
//
// Transparency cannot survive as a JPEG, so a photo that actually uses it is
// refused rather than flattened.

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

// Why a photo is not to spec, or an empty list if it is.
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
