<template>
    <ColorScheme>
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
    </ColorScheme>
</template>

<script setup>
    const config = useRuntimeConfig();

    useSeoMeta({
        title: 'Guess the Pokémon! | Made by Punto Damar P.',
        description: 'A fun and interactive game to test your knowledge of Pokemon. Made available using Pokemon API and Nuxt.js. Created by Punto Damar P.',
        ogSiteName: 'Guess the Pokémon! | Made by Punto Damar P.',
        ogType: 'website',
        ogImage: `${config.public.siteUrl}/og-image.png`,
        twitterImage: `${config.public.siteUrl}/og-image.png`,
        ogTitle: 'Guess the Pokémon!',
        ogDescription: 'A fun and interactive game to test your knowledge of Pokemon. Made available using Pokemon API and Nuxt.js. Created by Punto Damar P.',
        twitterCard: 'summary_large_image',
        robots: 'index, follow'
    })

</script>
