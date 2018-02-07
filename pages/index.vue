<template>
  <main>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              目次
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider />

      <v-list dense class="pa-0">
        <template v-for="(item, index) in headlines">
          <v-divider v-if="item.level === 2" :key="`${item.id}-${index}`" />
          <v-list-tile :key="index" :to="`#${item.id}`" nuxt>
            <v-list-tile-content>
              <v-list-tile-title>
                <div :class="level(item)">{{ item.text }}</div>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      fixed
      flat
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-spacer />
      <v-btn icon @click.stop="handleDownloadPdf">
        <v-icon>file_download</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="text-xs-left markdown-body" v-html="curriculumVitae" ref="content"></div>
  </main>
</template>

<script>
export default {
  data: () => ({
    drawer: true
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
    },
    generating () {
      return this.$store.state.pdf.generating
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
    },
    handleDownloadPdf () {
      this.$notify({
        group: 'info',
        title: 'Important message',
        text: 'Hello user! This is a notification!',
        duration: 999999
      });
      //this.$store.dispatch('pdf/generate', { element: this.$refs.content, filename: '職務履歴書' })
    }
  }
}
</script>

<style lang='stylus'>
@import '~/node_modules/github-markdown-css/github-markdown.css'
</style>

<style scoped lang='stylus'>
.level-1
  font-size 1.2em
.level-2
  font-size 1.0em
  margin-left 1em
.level-3
  font-size 0.9em
  margin-left 2em
.level-4
  font-size 0.9em
  margin-left 3em
</style>
