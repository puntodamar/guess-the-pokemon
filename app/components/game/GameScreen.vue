<template>
  <section class="flex flex-1 flex-col">
    <div class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-2xl">
        <div class="relative flex items-center justify-center">
          <div :class="imageLoaderClass" class="relative isolate w-64 h-64 md:w-80 md:h-80 overflow-visible transition-opacity duration-700 ease-out">
            <img
                @load="pokemonImageLoaded"
                :key="gameStore.pokemon.imageUrl"
                :src="gameStore.pokemon.imageUrl"
                class="absolute inset-0 w-full h-full object-contain z-0"
                :class="{'opacity-0': !gameStore.pokemon.imageReady}"
                style="mask: none; -webkit-mask: none;"
                loading="lazy"
            />

            <div v-show="!gameStore.pokemon.revealed" class="absolute inset-0 z-10 pointer-events-none" :style="silhouetteClass" aria-hidden="true"></div>
          </div>

          <div v-if="!gameStore.pokemon.imageReady" class="absolute">
            <video
                src="~/assets/images/loading.webm"
                class=" mx-auto  object-contain"
                autoplay
                loop
                muted
                playsinline
                preload="auto"
            />
            <span class="opacity-60">Loading Pokédex entry…</span>
          </div>


        </div>

<!--        <flavor-info class="mt-25" />-->

<!--        <p class="text-sm font-poppins text-center text-pretty mt-25">-->
<!--          <span v-if="gameStore.gameState !== GameStateError && gameStore.pokemon.imageReady">{{gameStore.pokemon.flavor}}</span>-->
<!--          <span v-else-if="gameStore.errorMessage" class="text-pokemon-red">{{ gameStore.errorMessage }}</span>-->
<!--          <span v-else class="opacity-60">Loading Pokédex entry…</span>-->
<!--        </p>-->


        <p class="text-sm font-poppins text-center text-pretty mt-25">
          <span
              v-show="gameStore.gameState !== GameStateError && gameStore.pokemon.imageReady"
              :key="gameStore.pokemon.imageUrl"
              class="transition-opacity duration-500 ease-out"
              :class="gameStore.pokemon.imageReady ? 'opacity-100' : 'opacity-0'">
            {{ gameStore.pokemon.flavor }}
          </span>
          <span v-if="gameStore.gameState === GameStateError" class="text-pokemon-red">{{ gameStore.errorMessage }}</span>

        </p>

      </div>
    </div>
  </section>
</template>

<script setup>

import {useGameStore} from "~/stores/gameStore";
import FlavorInfo from "~/components/game/FlavorInfo.vue";


const gameStore = useGameStore()
const colorMode = useColorMode()

const pokemonImageLoaded = () => {
  gameStore.pokemon.imageReady = true
}


const imageLoaderClass = computed(() => {

  if(!gameStore.pokemon.imageReady) return "opacity-0";
  return `
               opacity-100 before:content-[''] before:absolute before:-inset-16 before:z-0 before:pointer-events-none
               before:bg-no-repeat before:bg-cover before:bg-center
               before:bg-[radial-gradient(70%_70%_at_50%_50%,_#6b7280_0%,_#ffffff_85%)]
               dark:before:bg-[radial-gradient(70%_70%_at_50%_50%,_#E5E4E2_0%,_#0b0f17_85%)]
               before:[mask-image:radial-gradient(closest-side_at_50%_50%,_#000_75%,_transparent_100%)]
               before:[-webkit-mask-image:radial-gradient(closest-side_at_50%_50%,_#000_75%,_transparent_100%)]
               before:[mask-repeat:no-repeat] before:[-webkit-mask-repeat:no-repeat]
               `
})

const silhouetteClass = computed(() => {

  if (!gameStore?.pokemon?.imageUrl) return;

  const backgroundColor = colorMode.value === 'dark' ? '#E5E4E2' : '#6b7280'
  return {
    backgroundColor: backgroundColor,
    WebkitMaskImage: `url(${gameStore.pokemon.imageUrl})`,
    maskImage: `url(${gameStore.pokemon.imageUrl})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    filter: 'none',
    WebkitMaskComposite: 'source-over',
    maskMode: 'alpha'
  }
})

onMounted(gameStore.loadRandomPokemon);
</script>
