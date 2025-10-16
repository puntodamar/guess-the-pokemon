<template>
  <section class="flex flex-1 flex-col">
    <div class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-2xl">
        <div class="flex items-center justify-center">
          <div class="relative isolate w-64 h-64 md:w-80 md:h-80 overflow-visible
         before:content-[''] before:absolute before:-inset-16 before:z-0 before:pointer-events-none
         before:bg-no-repeat before:bg-cover before:bg-center
         before:bg-[radial-gradient(70%_70%_at_50%_50%,_#6b7280_0%,_#ffffff_85%)]
         dark:before:bg-[radial-gradient(70%_70%_at_50%_50%,_#E5E4E2_0%,_#0b0f17_85%)]
         before:[mask-image:radial-gradient(closest-side_at_50%_50%,_#000_75%,_transparent_100%)]
         before:[-webkit-mask-image:radial-gradient(closest-side_at_50%_50%,_#000_75%,_transparent_100%)]
         before:[mask-repeat:no-repeat] before:[-webkit-mask-repeat:no-repeat]">
            <img
                v-if="gameStore.pokemon.imageUrl"
                :key="gameStore.pokemon.imageUrl"
                :src="gameStore.pokemon.imageUrl"
                class="absolute inset-0 w-full h-full object-contain z-0"
                style="mask: none; -webkit-mask: none;"
                loading="lazy"
            />

            <div v-show="!gameStore.pokemon.revealed" class="absolute inset-0 z-10 pointer-events-none" :style="silhouetteClass" aria-hidden="true"></div>
          </div>
        </div>

        <p class="text-sm font-poppins text-center text-pretty">
          <span v-if="gameStore.isError" class="text-rose-400">{{ gameStore.errorMessage }}</span>
          <span v-else>{{ gameStore.pokemon.flavor }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>

import {useGameStore} from "~/stores/gameStore";


const gameStore = useGameStore()
const colorMode = useColorMode()

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
