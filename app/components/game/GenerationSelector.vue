<template>
  <div>
    <h3 class="ui-label" :class="titleMargin">Generations</h3>

    <div v-if="generations.length > 0" class="grid grid-cols-2  gap-2 mt-2 max-w-60">
      <div>
        <label
            class="group relative block rounded-lg border border-pokemon-blue px-6 py-4 has-checked:outline-2 has-checked:-outline-offset-2 has-checked:bg-pokemon-blue has-checked:outline-pokemon-blue  has-focus-visible:outline-3 has-focus-visible:-outline-offset-1 sm:flex sm:justify-between">
              <input
                  @click="setGeneration('all')"
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
              @click="setGeneration(gen)"
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
    <div class="bg-pokemon-yellow mt-3 py-1 px-3 rounded-lg transition-opacity duration-200 max-w-60"
         :class="showFlash ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'">
      <span class="text-xs text-pokemon-blue text-center">
        Will be applied to the next pokemon
      </span>
    </div>

  </div>
</template>
<script setup>
  import {useGameStore} from "~/stores/gameStore.js";

  const props = defineProps({
    titleMargin: {type: String, default: 'mb-0'},
  })
  const gameStore = useGameStore()
  const generations = ref([])
  const showFlash = ref(false);

  onMounted(() => {
    gameStore.getGeneration().then(generation => {
      for (let i = 1; i <= generation; i++) {
        generations.value.push(i)
      }
    })
  })

  const setGeneration = (generation) => {
    if(generation === 'all') {
      gameStore.setGeneration(null)
    } else {
      gameStore.setGeneration(generation)
    }
    triggerFlash()
    document.getElementById('pokemon-input').focus()

  }

  let t = null

  function triggerFlash() {
    showFlash.value = true
    clearTimeout(t)
    t = setTimeout(() => {
      showFlash.value = false
    }, 1000)
  }

  onBeforeUnmount(() => clearTimeout(t))
</script>