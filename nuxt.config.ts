// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: ['@pinia/nuxt'],

  css: ['~/assets/css/main.css'],

  // Fixes broken client navigation (#app-manifest resolve error)
  experimental: {
    appManifest: false,
  },

  app: {
    head: {
      title: 'Список новостей',
      htmlAttrs: { lang: 'ru' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Агрегатор новостей Mos.ru и Lenta.ru',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
        },
      ],
    },
  },

  runtimeConfig: {
    // Live RSS only — no local XML fixtures
    rssSources: {
      mos: 'https://www.mos.ru/rss',
      lenta: 'https://lenta.ru/rss',
    },
  },
})
