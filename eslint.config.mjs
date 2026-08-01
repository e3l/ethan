// eslint-config-next ships its presets as plain Linter.Config[] arrays, so
// they spread straight into this one.
//
// Linting is not part of `next build`. It runs only through `npm run lint`,
// which means CI has to invoke it explicitly for it to gate anything.

import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**'],
  },
  ...nextCoreWebVitals,
]

export default config
