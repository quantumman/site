export const state = () => ({
  generating: false
})

export const mutations = {
  START_GENERATION (state) {
    state.generating = true
  },
  END_GENERATION (state) {
    state.generating = false
  }
}

export const actions = {
  generate ({ commit }, { element, filename }) {
    commit('START_GENERATION')
    this.app.toPdf(element, filename)
    commit('END_GENERATION')
  }
}
