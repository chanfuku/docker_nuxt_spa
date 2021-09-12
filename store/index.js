export const state = () => ({
  images: []
})

export const mutations = {
  ADD_IMAGE(state, imgSrc) {
    state.images.unshift(imgSrc)
  }
}

export const actions = {
  async fetchRandomDog ({ commit }) {
    const resJson = await this.$axios.$get('https://dog.ceo/api/breeds/image/random')
    if (resJson.status === 'success') {
      commit('ADD_IMAGE', resJson.message)
    }
  },
  async fetchRandomCat ({ commit }) {
    const resJson = await this.$axios.$get('https://api.thecatapi.com/v1/images/search?format=json')
    commit('ADD_IMAGE', resJson[0].url)
  },
}
