<template>
  <v-app>
    <v-snackbar
      :timeout="snackbar.timeout"
      :top="snackbar.y === 'top'"
      :bottom="snackbar.y === 'bottom'"
      :right="snackbar.x === 'right'"
      :left="snackbar.x === 'left'"
      :multi-line="snackbar.mode === 'multi-line'"
      :vertical="snackbar.mode === 'vertical'"
      v-model="snackbarState"
    >
      {{ snackbar.text }}
      <v-btn flat color="pink" @click.native="snackbarState = false">閉じる</v-btn>
    </v-snackbar>

    <v-content>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true
  }),
  computed: {
    snackbar () {
      return this.$store.state.snackbar
    },

    snackbarState: {
      get () {
        return this.$store.state.snackbar.show
      },
      set (value) {
        if (value) {
          this.$store.dispatch('snackbar/show', {})
        } else {
          this.$store.dispatch('snackbar/close')
        }
      }
    }
  }
}
</script>


<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>
