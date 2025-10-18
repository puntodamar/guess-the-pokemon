<template>
  <section class="flex flex-col">
    <p class="mt-0 xl:mt-15 mb-30 lg:mb-40 text-center">
      <span class="font-ui text-2xl lg:text-5xl font-semibold tracking-tight mr-5 text-text" :class="{invisible: !gameStore.pokemon.imageReady}">{{formatVowels}}</span>
      <span class="text-2xl lg:text-5xl font-pokemon title title-outline" :class="{invisible: !gameStore.pokemon.imageReady}">{{`${gameStore.pokemon.name}!`}}</span>
    </p>

    <div class="flex justify-center">
      <div class="w-full max-w-2xl">
        <div class="relative flex items-center justify-center">

          <div :class="imageLoaderClass" class="relative isolate  overflow-visible transition-opacity rounded-full duration-700 ease-out">
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

          <div v-if="!gameStore.pokemon.imageReady" class="">
            <video
                src="~/assets/images/loading.webm"
                class=" mx-auto  object-contain"
                autoplay
                loop
                muted
                playsinline
                preload="auto"
            />
            <p class="text-text text-center">Loading Pokédex entry…</p>
          </div>


        </div>


        <p class="text-sm font-body text-center text-pretty mt-30 mx-10 hidden sm:block">
          <span
              v-show="gameStore.gameState !== GameStateError && gameStore.pokemon.imageReady"
              :key="gameStore.pokemon.imageUrl"
              class="transition-opacity duration-500 ease-out text-text"
              :class="gameStore.pokemon.imageReady ? 'opacity-100' : 'opacity-0'">
            {{ gameStore.pokemon.flavor }}
          </span>
          <span v-if="gameStore.gameState === GameStateError" class="text-pokemon-red">{{ gameStore.errorMessage }}</span>

        </p>


        <pokemon-name-input class="hidden lg:block" />

      </div>
    </div>
  </section>
</template>

<script setup>

import {useGameStore} from "~/stores/gameStore";
import FlavorInfo from "~/components/game/FlavorInfo.vue";
import PokemonNameInput from "~/components/game/PokemonNameInput.vue";

const gameStore = useGameStore()
const colorMode = useColorMode()
const vowels = ['a', 'e', 'i', 'o', 'u'];



const formatVowels = computed(() => vowels.includes(gameStore?.pokemon?.name?.charAt(0)) ? "It's an" : "It's a")
const pokemonImageLoaded = () => {
  gameStore.pokemon.imageReady = true
}



const imageLoaderClass = computed(() => {

  if(!gameStore.pokemon.imageReady) return "opacity-0";
  const size = gameStore.mobileKeyboardOpen ?  "w-25 h-25" : "w-55 h-55 md:w-80 md:h-80";

  const darkGradient = 'before:bg-[radial-gradient(50%_50%_at_50%_50%,_#ffffff_10%,_#ffffff_5%,_transparent_100%)]'
  const lightGradient = 'before:bg-[radial-gradient(50%_50%_at_50%_50%,_#6b7280_10%,_#6b7280_5%,_transparent_100%)]'
  const gradient = colorMode.value === 'dark' ? darkGradient : darkGradient

  return `
    opacity-100 before:content-[''] before:absolute before:-inset-13 md:before:-inset-20 inset-0 before:z-0 before:pointer-events-none
    before:bg-no-repeat before:bg-cover before:bg-center
    ${gradient} ${size}
 `
})

const silhouetteClass = computed(() => {

  if (!gameStore?.pokemon?.imageUrl) return;

  // const backgroundColor = colorMode.value === 'dark' ? '#E5E4E2' : '#0b1220'
  return {
    // backgroundColor: backgroundColor,
    backgroundColor: '#0b1220',
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

onMounted(() => {
  gameStore.getGeneration().then((generation) => {
    gameStore.loadRandomPokemon(generation)
  })
})



</script>
