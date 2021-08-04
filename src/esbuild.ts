import { transformSync, TransformOptions, TransformResult } from 'esbuild'

/**
 * transform typescript to javascript
 */
export const compile = (
  code: string,
  filename: string,
  options?: Partial<TransformOptions>,
): TransformResult => {
  // node target
  const target = [`node${process.version.slice(1)}`]

  return transformSync(code, {
    target,
    loader: 'ts',
    format: 'cjs',
    sourcemap: 'both',
    sourcefile: filename,
    ...options,
  })
}
