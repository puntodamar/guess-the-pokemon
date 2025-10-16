<template>
  <div class="flex flex-row w-full m-10 items-stretch justify-evenly gap-10">

    <div class="flex flex-col justify-between basis-1/4">
      <div>
        <h3 class="text-2xl font-ui font-semibold">Generations</h3>
      </div>

      <div>
        <h3 class="text-2xl font-ui font-semibold mb-5">Hotkeys</h3>
        <div class="flex flex-col space-y-5">
          <div class="flex flex-row space-x-5 items-center">
            <span>Skip</span>
            <span class="inline-flex items-center justify-center gap-2 border rounded-lg py-2 px-3 leading-none">
            <Icon name="qlementine-icons:key-tab-16" class="w-4 h-4"/>
            <span class="font-ui">Tab</span>
          </span>
          </div>
          <div class="flex flex-row space-x-5 items-center">
            <span>Clear</span>
            <span class="inline-flex items-center justify-center gap-2 border rounded-lg py-2 px-3 leading-none">
            <Icon name="mingcute:space-line" class="w-4 h-4"/>
            <span class="font-ui">Space</span>
          </span>
          </div>
        </div>
      </div>
    </div>


    <game-screen class="flex-1"/>


    <div class="flex flex-col justify-start basis-1/4">
      <div class="space-y-10">
        <div>
          <h3 class="text-2xl font-ui font-semibold">HP</h3>
          <p class="font-body text-xl">300</p>
        </div>
        <div>
          <h3 class="text-2xl font-ui font-semibold">Total Score</h3>
          <p class="font-body text-xl">300</p>
        </div>
        <div>
          <h3 class="text-2xl font-ui font-semibold">Max Streaks</h3>
          <p class="font-body text-xl">0</p>
        </div>
        <button class="btn btn-primary mx-auto justify-center" @click="gameStore.loadRandomPokemon()">Next</button>
      </div>
    </div>
  </div>



</template>

<script setup>
import GameScreen from '~/components/game/GameScreen'
import {useGameStore} from "~/stores/gameStore.js";
const gameStore = useGameStore()
</script>