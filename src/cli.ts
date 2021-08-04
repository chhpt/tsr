import fs from 'fs'
import path from 'path'
import Module from 'module'
import { install } from './hook'

function help() {
  console.log(`Usage: tsr <ts-file>
  --help, -h     Display help message`)
  process.exit(1)
}

function parseArgs() {
  const nodePath = process.argv[0]
  let args = process.argv.slice(2)

  const options = { debug: false }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    switch (arg) {
      case '-h':
      case '--help':
        help()
        continue
      default:
        args = args.slice(i)
        args.unshift(nodePath)
        return { options, args }
    }
  }

  return { options, args: [nodePath] }
}

export function main() {
  /**
   * args[0] node path
   * args[1] ts file path
   */
  const { args } = parseArgs()

  if (args.length >= 2 && fs.existsSync(args[1])) {
    process.argv = args
    process.argv[1] = path.resolve(process.argv[1])
    install()
    Module.runMain()
  } else {
    help()
  }
}
