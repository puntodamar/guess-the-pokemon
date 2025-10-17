<template>
  <div class="space-y-10 w-full">
    <div>
      <h3 class="ui-label">HP</h3>
      <p class="ui-text ">300</p>
    </div>
    <div>
      <h3 class="ui-label">Total Score</h3>
      <p class="ui-text ">300</p>
    </div>
    <div>
      <h3 class="ui-label">Max Streaks</h3>
      <p class="ui-text ">0</p>
    </div>
    <button class="btn btn-normal" @click="gameStore.revealPokemon()">Reveal</button>
    <button class="btn btn-primary" @click="gameStore.loadRandomPokemon()">Next</button>

  </div>
</template>

<script setup>
import {useGameStore} from "~/stores/gameStore.js";
const gameStore = useGameStore()
</script>