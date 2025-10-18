<template>
  <div class="space-y-10 w-full">
    <div>
      <h3 class="ui-label">Points</h3>
      <p class="ui-text ">{{gameStore.points.point}}</p>
    </div>
    <div>
      <h3 class="ui-label">Current Streak</h3>
      <p class="ui-text ">{{gameStore.points.currentStreak}}</p>
    </div>
    <div>
      <h3 class="ui-label">Longest Streak</h3>
      <p class="ui-text ">{{gameStore.points.longestStreak}}</p>
    </div>
<!--    <button class="btn btn-normal" @click="gameStore.revealPokemon()">Reveal</button>-->
<!--    <button class="btn btn-primary" @click="gameStore.loadRandomPokemon()">Next</button>-->

  </div>
</template>

<script setup>
import {useGameStore} from "~/stores/gameStore.js";
const gameStore = useGameStore()
</script>