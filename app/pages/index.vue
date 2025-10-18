<template>
  <div class="flex flex-1 flex-row w-full px-10 items-stretch gap-10">

    <!-- Left column -->
    <div class="lg:flex flex-col mt-50 justify-start  basis-1/4 shrink-0 hidden">
      <generation-selector/>
      <hotkeys class="mt-10"/>
    </div>

    <!-- Middle column -->
    <game-screen class="flex-1 min-w-0"/>

    <!-- Right column -->
    <div class="lg:flex flex-col mt-50 justify-start items-end  shrink-0 max-w-sm text-right hidden">
      <game-info/>
    </div>
  </div>




</template>

<script setup>
import GameScreen from '~/components/game/GameScreen'
import Hotkeys from "~/components/game/Hotkeys.vue";
import GameInfo from "~/components/game/GameInfo.vue";
import GenerationSelector from "~/components/game/GenerationSelector.vue";

</script>