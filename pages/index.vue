<template>
  <section>
    <aside class="toc mb-2">
      <ul class="toc-menu">
        <template v-for="item in headlines">
          <li :key="item.text" :class="level(item)">
            <nuxt-link :to="`#${item.text}`">{{ item.text }}</nuxt-link>
          </li>
        </template>
      </ul>
    </aside>
    <div class="text-xs-left markdown-body" v-html="curriculumVitae"></div>
  </section>
</template>

<script>
import allRepos from '~/apollo/queries/allRepos'
import repository from '~/apollo/queries/repository'
import { retry } from 'async';

export default {
  data: () => ({
    allRepos: {}
  }),
  async fetch ({store, params}) {
    return await store.dispatch('repository/fetch')
  },
  computed: {
    curriculumVitae () {
      return this.$store.state.repository.curriculumVitae
    },
    headlines () {
      return this.$store.state.repository.headlines
    }
  },
  methods: {
    level (item) {
      return {
        'level-1': item.level === 1,
        'level-2': item.level === 2,
        'level-3': item.level === 3,
        'level-4': item.level === 4,
        'level-5': item.level === 5,
        'level-6': item.level === 6,
      }
    }
  },
  apollo: {
    allRepos: {
      prefetch: true,
      query: allRepos,
      update: ({ user }) => user.repositories.nodes
    }
  }
}
</script>

<style lang='stylus'>
@import '~/node_modules/github-markdown-css/github-markdown.css'
</style>

<style scoped lang='stylus'>
.toc
  border solid 1px #ddd
  font-size 0.8em
  padding 0.2em
ul.toc-menu
  list-style none
li
  &.level-1
    font-size 1.2em
  &.level-2
    font-size 1.0em
    margin-left 1em
  &.level-3
    font-size 0.9em
    margin-left 2em
  &.level-4
    font-size 0.8em
    margin-left 3em
.toc-menu a
  text-decoration-line none
</style>
