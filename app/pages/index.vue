<template>
  <div class="relative flex flex-col lg:flex-row min-h-dvh w-full">

    <div class="hidden xl:flex flex-1 min-w-0 flex-col mt-50 ml-10">
      <generation-selector/>
      <hotkeys class="mt-10"/>
    </div>

    <game-screen class="flex-1 min-w-0 justify-center lg:items-center pb-[calc(env(safe-area-inset-bottom)+var(--kb,0px)+4rem)]"/>
    <div
        class="lg:hidden fixed inset-x-0 z-50 border-t border-transparent px-3 py-2"
         style="bottom: calc(env(safe-area-inset-bottom) + var(--kb, 0px)); background: transparent;">
      <pokemon-name-input class="w-full bg-transparent"/>
    </div>

    <div class="hidden xl:flex flex-1 min-w-0 flex-col items-end text-right mt-50 mr-10">
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

const gameStore = useGameStore();
</script>