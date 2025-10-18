<template>
  <div class="flex flex-col min-h-0 flex-1">

    <pokemon-name-display :classes="'hidden xl:block mt-20 mb-30'" mode="desktop" />

    <div class="relative flex flex-col lg:flex-row w-full flex-1 min-h-0">

      <div class="hidden xl:flex flex-1 min-w-0 flex-col ml-10">
        <generation-selector/>
        <hotkeys class="mt-10"/>
      </div>

      <div class="flex flex-1 min-w-0 min-h-0 items-center justify-center pb-[calc(env(safe-area-inset-bottom)+var(--kb,0px)+3.5rem)] lg:pb-0 lg:block lg:items-stretch lg:justify-normal">
        <game-screen
            class="min-w-0 min-h-0 lg:items-center"
            :class="gameScreenClass"
        />
      </div>


      <div class="lg:hidden fixed inset-x-0 z-50 border-t border-transparent px-3 py-2"
          style="--footer-h: 3.5rem; bottom: calc(env(safe-area-inset-bottom) + var(--kb, 0px) + var(--footer-h)); background: transparent;">
        <pokemon-name-input class="w-full bg-transparent"/>
      </div>

      <div class="hidden xl:flex flex-1 min-w-0 flex-col items-end text-right mr-10">
        <game-info/>
      </div>
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
import PokemonNameDisplay from "~/components/game/PokemonNameDisplay.vue";

const gameStore = useGameStore();

const gameScreenClass = computed(() => {
  return gameStore.mobileKeyboardOpen ? 'justify-start mt-17' : 'justify-center'
})

const pokemonNameClass = computed(() => {
  let classes = "";
  if(!gameStore.pokemon.imageReady) classes += "invisible";

  classes += gameStore.mobileKeyboardOpen ? "text-xl lg:text-5xl" : " text-2xl lg:text-5xl";
  return classes;
})

const vowels = ['A', 'I', 'U', 'E', 'O'];
const formatVowels = computed(() => vowels.includes(gameStore?.pokemon?.name?.charAt(0)) ? "It's an" : "It's a")
</script>