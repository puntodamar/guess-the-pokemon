import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    css: ['~/assets/css/main.css'],
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        head: {
            title: "Guess The Pokemon!",
            htmlAttrs: {lang: 'en'},
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {name: 'format-detection', content: 'telephone=no'},
                {name: 'description', content: 'Guess The Pokemon is an portofolio application made by puntodamar'},
            ],
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
                {rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
                {rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
                {rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png'},
                {rel: 'manifest', href: '/site.webmanifest'},
                {rel: 'stylesheet', href: 'https://fonts.cdnfonts.com/css/pokemon-solid'},
                {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
                {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: ''},
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap'
                }
            ]
        }
    },

    modules: ['@nuxtjs/color-mode', '@nuxt/icon', '@pinia/nuxt'],
    colorMode: {
        classSuffix: '-mode',
        preference: 'dark',
        fallback: 'dark',
        // hid: 'pokemon-color-mode-script',
        // globalName: '__NUXT_COLOR_MODE__',
        // componentName: 'ColorScheme',
        // classPrefix: '',
        // classSuffix: '',
        storage: 'localStorage',
        storageKey: 'pokemon-color-mode'
    },
    icon: {
        mode: 'css',
        cssLayer: 'base'
    }
});