export const state = () => ({
  images: [],
  lines: []
})

export const mutations = {
  ADD_IMAGE(state, imgSrc) {
    state.images.unshift(imgSrc)
  },
  ADD_LINE(state, payload) {
    state.lines.push(payload)
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
  async addLine ({ commit }, payload) {
    commit('ADD_LINE', payload)
  },
}
