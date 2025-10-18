<template>
  <form  @submit.prevent class="mt-20 lg:mt-10">
    <input
        id="pokemon-input"
        name="pokemon-input"
        v-model="gameStore.userInput"
        autofocus
        type="text"
        class="w-full rounded-xl px-4 py-3 text-center text-xl font-ui text-pokemon-yellow font-bold focus:outline-none uppercase "
    />
  </form>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import {useGameStore} from "~/stores/gameStore.js";
const gameStore = useGameStore()


function onGlobalKeydown(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return

  const isSpace  = e.key === ' ' || e.code === 'Space'
  // const isLetter = e.key.length === 1 && /^[a-z]$/i.test(e.key)

  if (isSpace) {
    e.preventDefault()
    gameStore.resetUserInput()
    return
  }
}

onMounted(() => {
  window.addEventListener('keydown', onGlobalKeydown, { capture: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onGlobalKeydown, { capture: true })
})
</script>