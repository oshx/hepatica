<template>
  <nuxt />
</template>

<script type="ts">
import Vue from 'vue'

export default Vue.extend({
  ...process.server && {},
  ...process.client && {
    head() {
      return {
        lang: window.navigator.language || process.env.lang || 'ko-KR',
      }
    },
  },
})
</script>

<style lang="scss" module>
html {
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
