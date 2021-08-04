import path from 'path'
import NodeModule from 'module'
import sourceMapSupport from 'source-map-support'
import { compile } from './esbuild'

const Module = NodeModule as any

/**
 * source map
 */
const map: { [file: string]: string } = {}

/**
 * adds source map support
 */
function installSourceMapSupport() {
  sourceMapSupport.install({
    environment: 'node',
    hookRequire: true,
    handleUncaughtExceptions: false,
    retrieveSourceMap(file) {
      if (map[file]) {
        return {
          url: file,
          map: map[file],
        }
      }
      return null
    },
  })
}

export function supports(filename: string) {
  if (filename.includes('node_modules')) return false
  return path.extname(filename).includes('.ts')
}

export function install() {
  installSourceMapSupport()
  const defaultLoader = Module._extensions['.js']

  Module._extensions['.ts'] = (mod, filename: string) => {
    if (supports(filename)) {
      // save raw _compile
      const defaultCompile = mod._compile

      mod._compile = (code: string) => {
        // transform code
        const { code: js, map: sourceMap } = compile(code, filename)
        map[filename] = sourceMap

        // reset _compile
        mod._compile = defaultCompile
        return mod._compile(js, filename)
      }
    }

    defaultLoader(mod, filename)
  }
}
