<template>
  <div>
    <h3 class="ui-label">Generations</h3>

    <div class="flex flex-col">
<!--      <URadioGroup v-model="gameStore.gameState.generation" :items="generations" />-->
    </div>
  </div>
</template>
<script setup>
  import {useGameStore} from "~/stores/gameStore.js";
  const gameStore = useGameStore()
  const generations = []
  onMounted(() => {
    gameStore.getGeneration().then(generation => {
      for (let i = 1; i <= generation; i++) {
        generations.push(i)
      }
    })
  })
</script>