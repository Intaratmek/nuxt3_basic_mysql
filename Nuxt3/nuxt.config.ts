// https://nuxt.com/docs/api/configuration/nuxt-config

require("dotenv").config();
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    // Private config that is only available on the server
    apiSecret: "123",
    // Config within public will be also exposed to the client
    public: {
      key: process.env.KEY,
      server: process.env.Sever,
      portio: process.env.socketPORT,
    },
  },
  app: {
    head: {
      title: "Nuxt3 Basic",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "Nuxt3 Basic" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          hid: "icon",
          rel: "icon",
          type: "image/png",
          href: "/digital-asset.png",
        },
        {
          hid: "apple-touch-icon",
          rel: "apple-touch-icon",
          href: "/digital-asset.png",
        },
        { rel: "manifest", href: "/manifest.json" },
      ],
    },
  },
  css: ["@/assets/css/main.css"],
  experimental: {
    reactivityTransform: false,
  },

  components: true,
  plugins: ["~/plugins/navbar.ts"],
  build: {
    transpile: ["@headlessui/vue"],
  },
  modules: ["@pinia/nuxt", "@vueuse/nuxt", "@nuxt/image-edge"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vueuse: {
    ssrHandlers: true,
  },
  vite: {},
  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: true,
    },
  },
  image: {
    provider: "imgix",
    imgix: {
      baseURL: "",
    },
    imagekit: {
      baseURL: `${process.env.Sever}/img/`
    },
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      "2xl": 1536,
    },
  },
});
