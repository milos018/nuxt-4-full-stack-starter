// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  modules: [
    '@nuxt/ui-pro',
    '@nuxt/eslint',
    '@vee-validate/nuxt',
    '@nuxt/test-utils/module',
    '@pinia/colada-nuxt',
    '@pinia/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      googleClientId: import.meta.env.NUXT_GOOGLE_CLIENT_ID,
      googleRedirectUri: import.meta.env.NUXT_GOOGLE_REDIRECT_URI,
      auth: {
        redirectUserTo: '/app',
        redirectGuestTo: '/',
      },
      paddleClientToken: import.meta.env.NUXT_PADDLE_CLIENT_TOKEN,
    },
    googleClientSecret: '',
    resendApiKey: '',
    anthropicApiKey: '',
    paddleApiKey: '',
    lemonSqueezyApiKey: '',
  },

  colorMode: {
    preference: 'light',
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    typedPages: true,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  compatibilityDate: '2025-06-26',
  devtools: { enabled: true },
})
