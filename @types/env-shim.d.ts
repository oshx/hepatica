declare namespace NodeJS {
  interface Process {
    env: ProcessEnv

    // nuxt
    client: boolean
    server: boolean
  }

  interface ProcessEnv {
    /* eslint-disable camelcase */
    /* 예외적으로 env properties 에 snake case 허용 */
    npm_package_config_ssh: string
    npm_package_config_remote: string
    npm_package_config_branch: string
    npm_package_config_path: string
    npm_package_config_asset: string
    /* eslint-enable */

    [key: string]: string | undefined
  }
}
