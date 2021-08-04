import path from 'path'

export const run = () => {
  console.log('run log')
  console.log(path.resolve(__dirname))
}

run()
