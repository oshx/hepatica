import rimraf from 'rimraf'
import gitP from 'simple-git/promise'
import { bold, green, red, blue, yellow } from 'colors/safe'

const SSH_GIT_URL = process.env.npm_package_config_ssh as string
const BRANCH = process.env.npm_package_config_branch as string
const PATH = process.env.npm_package_config_path as string
const REMOTE = process.env.npm_package_config_remote as string

const SUCCEED = bold(green('SUCCEED'))
const FAILED = bold(red('FAILED'))
const IGNORED = bold(blue('IGNORED'))
const PENDING = bold(yellow('PENDING'))

const $ = (jobName: string) => {
  jobName = bold(jobName)
  console.info(`[${jobName}:${PENDING}] has been started.`)
  return async function tryJob(job: Promise<any>, ignorable = false) {
    try {
      await job
      return Promise.resolve(console.info(`[${jobName}:${SUCCEED}]`))
    } catch (exception) {
      if (ignorable) {
        return Promise.resolve(console.info(`[${jobName}:${IGNORED}]`))
      }
      return Promise.reject(console.error(`[${jobName}:${FAILED}]`, exception))
    }
  }
}

rimraf(
  `${PATH}.git`,
  async (): Promise<void> => {
    console.debug(`[${bold(`${PATH}.git`)}:${SUCCEED}] has been removed.`)

    const {
      init,
      checkoutLocalBranch,
      addRemote,
      fetch,
      raw,
      add,
      commit,
      push,
    } = gitP(PATH)

    await $('init')(init(false))
    await $('checkout')(checkoutLocalBranch(BRANCH))
    await $('addRemove')(addRemote(REMOTE, SSH_GIT_URL))
    await $('fetch')(fetch(REMOTE, BRANCH), true)
    await $('mixedReset')(
      raw(['reset', '--mixed', `${REMOTE}/${BRANCH}`]),
      true
    )
    await $('add')(add('*'))

    const MESSAGE = `[AUTO-BUILD] ${new Date()}`
    await $(`commit "${MESSAGE}"`)(commit(MESSAGE))
    await $('push')(push(REMOTE, BRANCH))
  }
)
