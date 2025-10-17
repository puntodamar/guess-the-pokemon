<template>
  <div class="flex flex-1 flex-row w-full px-10 items-stretch gap-10">

    <!-- Left column -->
    <div class="flex flex-col justify-around basis-1/4 shrink-0">
      <div>
        <h3 class="ui-label">Generations</h3>
      </div>

      <div>
        <h3 class="ui-label mb-5">Hotkeys</h3>

        <div class="flex flex-col gap-y-2">
          <div class="flex items-center gap-6">
            <span class="w-20 text-left">Skip</span>
            <span class="hotkey">
              <Icon name="qlementine-icons:key-tab-16" class="w-4 h-4 shrink-0"/>
              <span class="font-ui">Tab</span>
            </span>
          </div>

          <div class="flex items-center gap-6">
            <span class="w-20 text-left">Clear</span>
            <span class="hotkey">
              <Icon name="mingcute:space-line" class="w-4 h-4 shrink-0"/>
              <span class="font-ui">Space</span>
            </span>
          </div>

          <div class="flex items-center gap-6">
            <span class="w-20 text-left">Submit</span>
            <span class="hotkey">
              <Icon name="uiw:enter" class="w-4 h-4 shrink-0"/>
              <span class="font-ui">Enter</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Middle column -->
    <game-screen class="flex-1 min-w-0"/>

    <!-- Right column -->
    <div class="flex flex-col justify-center items-end basis-1/4 shrink-0 max-w-sm text-right">
      <div class="space-y-10 w-full">
        <div>
          <h3 class="ui-label">HP</h3>
          <p class="font-body text-xl">300</p>
        </div>
        <div>
          <h3 class="ui-label">Total Score</h3>
          <p class="font-body text-xl">300</p>
        </div>
        <div>
          <h3 class="ui-label">Max Streaks</h3>
          <p class="font-body text-xl">0</p>
        </div>
        <button class="btn mx-auto bg-pokemon-blue" @click="gameStore.revealPokemon()">Reveal</button>
        <button class="btn btn-primary mx-auto " @click="gameStore.loadRandomPokemon()">Next</button>

      </div>
    </div>
  </div>




</template>

<script setup>
import GameScreen from '~/components/game/GameScreen'
import {useGameStore} from "~/stores/gameStore.js";
const gameStore = useGameStore()
</script>