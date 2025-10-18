<template>
  <div>
    <h3 class="ui-label">Generations</h3>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
      <div>
        <label
            class="group relative block rounded-lg border border-pokemon-blue px-6 py-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:outline-pokemon-blue has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 sm:flex sm:justify-between">
              <input
                  type="radio"
                  name="generation"
                  value="all"
                  checked
                  class="absolute inset-0 appearance-none focus:outline-none"
              />
              <span class="flex items-center">
            <span class="flex flex-col text-sm">
              <span class="font-ui">All Gen</span>
            </span>
          </span>
        </label>
      </div>

      <div v-for="gen in generations" :key="gen">
        <label
            class="group relative block rounded-lg border border-pokemon-blue px-6 py-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:bg-pokemon-blue has-checked:outline-pokemon-blue  has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 sm:flex sm:justify-between">
          <input
              type="radio"
              name="generation"
              :value="gen"
              class="absolute inset-0 appearance-none focus:outline-none"
          />
          <span class="flex items-center">
            <span class="flex flex-col text-sm">
              <span class="font-ui">{{ `Gen ${gen}` }}</span>
            </span>
          </span>
        </label>
      </div>
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