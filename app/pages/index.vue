<template>

  <div class="relative flex flex-col lg:flex-row w-full flex-1 min-h-0">

    <div class="hidden xl:flex flex-1 min-w-0 flex-col ml-10 mt-80">
      <generation-selector/>
      <hotkeys class="mt-10"/>
    </div>




    <game-screen class="flex-1 min-w-0 lg:items-center" :class="gameScreenClass"/>

    <div v-if="isMobile" class="sticky bottom-0 inset-x-0 z-40 border-t border-transparent px-3 py-2" style="background: transparent;">
      <pokemon-name-input class="w-full bg-transparent"/>
    </div>

    <div class="hidden xl:flex flex-1 min-w-0 flex-col  mt-80 items-end text-right mr-10">
      <game-info/>
    </div>
  </div>


</template>

<script setup>
import GameScreen from '~/components/game/GameScreen'
import Hotkeys from "~/components/game/Hotkeys.vue";
import GameInfo from "~/components/game/GameInfo.vue";
import GenerationSelector from "~/components/game/GenerationSelector.vue";
import PokemonNameInput from "~/components/game/PokemonNameInput.vue";
import {useGameStore} from "~/stores/gameStore";
import {xl, lg, isMobile} from "~/composables/useTailwindScreens.js";
const gameStore = useGameStore();

const gameScreenClass = computed(() => {
  return gameStore.mobileKeyboardOpen ? 'justify-start mt-17' : 'justify-center'
})
</script>