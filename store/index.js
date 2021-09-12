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
}
