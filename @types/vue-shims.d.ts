declare module '*.vue' {
  import Vue from 'vue'
  export = Vue
}

declare namespace NodeJS {
  interface Process {
    env: ProcessEnv
  }
  interface ProcessEnv {
    [key: string]: string | undefined
  }
}
