<template>
  <div>
    <h1>Nuxt.js Rendering mode: SPA(Single Page App)</h1>
    <p><a href="/">aタグでトップに戻る</a></p>
    <p><button @click="toTop">window.location.href</button></p>
    <p><NuxtLink to="/">NuxtLinkでトップに戻る</NuxtLink></p>
    <p><button @click="push">$router.pushでトップに戻る</button></p>

    <button @click="addDogImage">犬画像追加</button>
    <div v-if="$fetchState.pending">
        <img class="loading__img" src="@/assets/img/loading-spin.svg">
    </div>
    <div v-else class="imagebox">
      <img :src="image" v-for="image in images" :key="image">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    images (): string[] {
      return this.$store.state.images
    },
  },
  async fetch(): Promise<void> {
    // console.log(this.$nuxt.context)
    console.log('test.vueです')
    await this.$store.dispatch('fetchRandomDog')
  },
  methods: {
    async addDogImage(): Promise<void> {
      await this.$fetch()
    },
    async toTop(): Promise<void> {
      window.location.href = '/'
    },
    async push(): Promise<void> {
      this.$router.push('/')
    },
  }
})
</script>

<style scoped>
.loading__img {
  width:30%;
}
.imagebox {
  max-width: 100px;
}
</style>
