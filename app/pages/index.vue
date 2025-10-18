<template>
  <div class="flex w-full px-10 gap-10 flex-1 justify-center">
    <div class="hidden xl:flex flex-1 min-w-0 flex-col mt-50">
      <generation-selector/>
      <hotkeys class="mt-10"/>
    </div>

    <div class="flex flex-col">
      <game-screen class="flex-1 min-w-0"/>
      <pokemon-name-input class="lg:hidden" />
    </div>

    <div class="hidden xl:flex flex-1 min-w-0 flex-col items-end text-right mt-50">
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

</script>