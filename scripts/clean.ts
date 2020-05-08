import rimraf from 'rimraf'

const { npm_package_config_path: PATH } = process.env

console.debug({ PATH })

rimraf(PATH as string, () => {
  console.log(`[${PATH}] has been removed.`)
})
