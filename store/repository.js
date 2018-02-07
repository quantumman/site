import query from '~/apollo/queries/repository'
import marked from 'marked'

const renderer = new marked.Renderer()
renderer.heading = (text, level) => `<h${level} id="${text}">${text}</h${level}>`
marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

export const state = () => ({
  curriculumVitae: '',
  headlines: []
})

export const mutations = {
  UPDATE_CURRICULUM_VITAE (state, text) {
    state.curriculumVitae = text
  },
  UPDATE_HEADLINES (state, headlines) {
    state.headlines = headlines
  }
}

export const actions = {
  async fetch (store) {
    const client = this.app.apolloProvider.defaultClient
    const {data} = await client.query({query})
    store.commit('UPDATE_CURRICULUM_VITAE', marked(data.repository.object.text))

    const headlines = marked.lexer(data.repository.object.text)
      .filter(_ => _.type === 'heading')
      .filter(_ => _.depth <= 4)
      .map(_ => ({
        level: _.depth,
        text: _.text
      }))
    store.commit('UPDATE_HEADLINES', headlines)
  }
}
