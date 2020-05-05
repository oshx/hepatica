declare module '*.vue' {
  import Vue from 'vue'
  export = Vue
}

declare namespace NodeJS {
  interface Process {
    env: ProcessEnv

    // nuxt
    client: boolean
    server: boolean
  }

  interface ProcessEnv {
    [key: string]: string | undefined
  }
}
