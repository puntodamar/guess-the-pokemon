<template>

  <form
      @submit.prevent class="mt-0  md:mb-0 lg:mt-10 sm:static px-4 py-3 w-full max-w-2xl mx-auto pb-[env(safe-area-inset-bottom)]"
      :class="[gameStore.mobileKeyboardOpen ? 'fixed inset-x-0 z-20 mb-2' : 'sticky bottom-10 mb-10']"
      :style="gameStore.mobileKeyboardOpen ? { bottom: `${keyboardOffset}px` } : undefined">

    <div  class="relative">
      <input
          id="pokemon-input"
          name="pokemon-input"
          v-model="gameStore.userInput"
          type="text"
          autofocus
          class="relative w-full rounded-xl pr-14 py-3 text-center text-xl font-ui text-pokemon-yellow font-bold uppercase outline-2 outline-text outline-offset-0"
          :class="{'opacity-100': gameStore.pokemon.imageReady, 'opacity-0': !gameStore.pokemon.imageReady}"
          @blur="stop()"
          aria-describedby="input-timer"
      />

      <div
          v-show="showBadge"
          class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center select-none pointer-events-none text-pokemon-yellow font-bold text-sm backdrop-blur-sm"
          :class="{'opacity-100': gameStore.pokemon.imageReady, 'opacity-0': !gameStore.pokemon.imageReady}"
          id="input-timer"
          aria-live="polite"
      >
        {{ timeLeft }}
      </div>
    </div>

  </form>
</template>

<script setup>
import {useGameStore} from "~/stores/gameStore.js";

const gameStore = useGameStore()
const keyboardOffset = ref(0)

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


const timeLeft = ref(3)
const showBadge = ref(false)
let timer = null

function tick() {
  timeLeft.value -= 1
  if (timeLeft.value <= 0) stop()
}

function triggerShowBadge() {
  showBadge.value = true
  timeLeft.value = 3
  clearInterval(timer)
  timer = setInterval(tick, 1000)
}

function stop() {
  clearInterval(timer)
  timer = null
  showBadge.value = false
}

function updateKeyboardState() {
  const vv = window.visualViewport
  if (!vv) return

  const lost = window.innerHeight - vv.height - vv.offsetTop
  const open = lost > 100

  gameStore.setKeyboardOpen(open)
  keyboardOffset.value = open ? Math.max(0, lost) : 0
}

onMounted(() => {

  const vv = window.visualViewport
  if (!vv) return
  vv.addEventListener('resize', updateKeyboardState)
  vv.addEventListener('scroll', updateKeyboardState)
  updateKeyboardState()
})

onBeforeUnmount(() => {
  stop()
  const vv = window.visualViewport
  if (!vv) return
  vv.removeEventListener('resize', updateKeyboardState)
  vv.removeEventListener('scroll', updateKeyboardState)
})
</script>