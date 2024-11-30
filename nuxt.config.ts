// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr: false,
  modules: ['@nuxtjs/color-mode', 'nuxt-toastify'],
  toastify: {
    theme: 'auto',
    position: 'top-right',
    autoClose: 3000,
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})