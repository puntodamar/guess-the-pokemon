import tailwindcss from "@tailwindcss/vite";
import * as process from "node:process";

export default defineNuxtConfig({
    $development: undefined, $env: undefined, $meta: undefined, $production: undefined, $test: undefined,
    css: ['~/assets/css/main.css'],
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    vite: {
        plugins: [
            tailwindcss(),
        ],
        server: {
            allowedHosts: ['.ngrok-free.dev']
        }
    },
    app: {
        pageTransition: {name: 'page', mode: 'out-in'},
        head: {
            title: "Guess The Pokemon!",
            htmlAttrs: {lang: 'en'},
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1'},
                {name: 'format-detection', content: 'telephone=no'},
                {
                    name: 'description',
                    content: 'Guess The Pokemon is a portofolio application made by Punto Damar P. using Nuxt.js and pokemon API'
                },
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

    modules: ['@nuxtjs/color-mode', '@nuxt/icon', '@pinia/nuxt', '@nuxtjs/ngrok', '@nuxtjs/sitemap'],
    colorMode: {
        classSuffix: '-mode',
        preference: 'light',
        fallback: 'light',
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
    },
    ngrok: {
        // module options
    },

    runtimeConfig: {
        public: {
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000' // replace with your domain
        }
    },
    // site: {
    //     url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    //     name: 'Guess The Pokemon!',
    //     description: 'A fun and interactive game to test your knowledge of Pokemon. Made available using Pokemon API and Nuxt.js. Created by Punto Damar P.',
    //     // image: '/og-image.png',
    //     defaultLocale: 'en'
    // },
    //
    // robots: {
    //     allow: '/',
    //     sitemap: '/sitemap.xml'
    // },
    //
    // sitemap: {
    //     autoLastmod: true,
    //     discoverImages: true
    // }
});