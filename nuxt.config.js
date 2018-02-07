module.exports = {
  // Add apollo module
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/vuetify'
  ],

  plugins: [
    { src: '~/plugins/html2pdf', ssr: false },
    { src: '~/plugins/vue-notification', ssr: false }
  ],

  // Give apollo module options
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },

  vuetify: {
    // Vuetify options
    //  theme: { }
  },

  router: {
    scrollBehavior (to, from, savedPosition) {
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      let position = false

      // if no children detected
      if (to.matched.length < 2) {
        // scroll to the top of the page
        position = { x: 0, y: 0 }
      } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
        // if one of the children has scrollToTop option set to true
        position = { x: 0, y: 0 }
      }

      // savedPosition is only available for popstate navigations (back button)
      if (savedPosition) {
        position = savedPosition
      }

      return new Promise(resolve => {
        if (to.hash && document.querySelector(to.hash)) {
          // scroll to anchor by returning the selector
          position = { selector: to.hash, offset: { x: 0, y: 64 } }
        }
        resolve(position)
      })
    }
  },

  css: [
    '~/node_modules/animate.css/animate.css'
  ],

  /*
  ** Headers of the page
  */
  head: {
    title: 'curriculum-vitae',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'vue-notification'
    ],

    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
