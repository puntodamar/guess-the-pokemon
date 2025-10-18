<template>
  <p class="text-sm font-poppins text-center text-pretty">
    <span v-if="gameStore.gameState !== GameStateError && gameStore.pokemon.imageReady">
      {{ typedFlavor }}
    </span>
    <span v-else-if="gameStore.errorMessage" class="text-rose-400">
      {{ gameStore.errorMessage }}
    </span>
  </p>
</template>

<script setup>
import {useGameStore} from "~/stores/gameStore";
const gameStore = useGameStore()

const typedFlavor = ref('')

let timer = null
let caretTimer = null
let runId = 0

function clearTimers () {
  if (timer) { clearTimeout(timer); timer = null }
  if (caretTimer) { clearInterval(caretTimer); caretTimer = null }
}

function typeText (text, speed = 22, spaceSpeed = 12) {
  runId++
  const id = runId
  typedFlavor.value = ''
  const chars = Array.from(text) // handles emoji/surrogates

  let i = 0
  const step = () => {
    // kill if a new run started
    if (id !== runId) return
    typedFlavor.value += chars[i++]
    if (i < chars.length) {
      const delay = chars[i - 1] === ' ' ? spaceSpeed : speed
      timer = setTimeout(step, delay)
    }
  }
  step()
}

watch(
    () => [gameStore.pokemon.flavor, gameStore.pokemon.imageReady, gameStore.gameState],
    ([flavor, ready, state]) => {
      clearTimers()
      typedFlavor.value = ''
      if (!ready || state === GameStateError || !flavor) return
      // You can tweak speed here:
      typeText(flavor, 22, 10)
    },
    { immediate: true }
)

onBeforeUnmount(clearTimers)
</script>

<style scoped>
.caret {
  display: inline-block;
  width: 0.5ch;
  margin-left: 1px;
}
</style>