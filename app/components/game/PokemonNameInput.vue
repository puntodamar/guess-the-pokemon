<template>

  <form
      @submit.prevent class="mt-0  md:mb-0 lg:mt-10 sm:static px-4 py-3 w-full max-w-2xl mx-auto pb-[env(safe-area-inset-bottom)]"
      :class="[gameStore.mobileKeyboardOpen ? 'fixed inset-x-0 z-20 mb-2' : 'sticky bottom-10 mb-10']"
      :style="gameStore.mobileKeyboardOpen ? { bottom: `${keyboardOffset}px` } : undefined">

    <div class="relative">
      <input
          ref="pokemonInput"
          id="pokemon-input"
          name="pokemon-input"
          v-model="gameStore.userInput"
          type="text"
          autofocus
          class="relative w-full rounded-xl pl-14 pr-14 py-3 text-center text-xl font-ui font-bold uppercase outline-2 outline-offset-0"
          :class="inputClass"
          :placeholder="`DEBUG: ${gameStore.pokemon.name}`"
          aria-describedby="input-timer"
          @focus="addListeners"
          @blur="removeListeners"
      />

      <div
          v-show="showBadge"
          class="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center select-none pointer-events-none text-text font-bold text-sm backdrop-blur-sm"
          :class="{'opacity-100': gameStore.pokemon.imageReady, 'opacity-0': !gameStore.pokemon.imageReady}"
          id="input-timer"
          aria-live="polite">
        {{ timeLeft }}
      </div>
    </div>


  </form>
</template>

<script setup>
import {useGameStore} from "~/stores/gameStore.js";

const gameStore = useGameStore()
const keyboardOffset = ref(0)
const pokemonInput = ref(null)
const timeLeft = ref(3)
const showBadge = ref(false)
let countdownTimer = null


const inputClass = computed(() => {
  let classes = []
  classes.push(gameStore.pokemon.imageReady ? "opacity-100" : "opacity-0")
  classes.push(gameStore.inputResult === true ? "outline-pokemon-yellow text-pokemon-yellow" : gameStore.inputResult === false ? "outline-pokemon-red text-pokemon-red" : "outline-text text-text")
  classes.push(gameStore.inputResult === false ? "shake" : "")
  return classes
})

function onGlobalKeydown(e) {
  if (showBadge.value) return
  if (e.ctrlKey || e.metaKey || e.altKey || e.isComposing || e.repeat) return

  const isSpace  = e.key === ' ' || e.code === 'Space'
  const isEnter  = e.key === 'Enter'

  if (isSpace) {
    e.preventDefault()
    gameStore.resetUserInput()
    return
  }

  if (isEnter) {
    e.preventDefault()
    gameStore.playPokemonCry()
    gameStore.submitName()
  }
}

onMounted(() => {
  window.addEventListener('keyup', onGlobalKeydown, { capture: true })
})

function tick() {
  timeLeft.value -= 1
  if (timeLeft.value <= 0 && timeLeft.value !== 1) {

    stopBadgeCountdown(true)
  }
}

function triggerShowBadge() {
  showBadge.value = true
  timeLeft.value = 3
  clearInterval(countdownTimer)
  gameStore.revealPokemon()
  countdownTimer = setInterval(tick, 1000)
}

function stopBadgeCountdown(reset = false) {
  clearInterval(countdownTimer)
  countdownTimer = null
  showBadge.value = false
  if(reset) resetGame()
}

function resetGame() {
  gameStore.resetUserInput()
  gameStore.loadRandomPokemon()
  gameStore.clearResult()

}

function updateKeyboardState() {
  const vv = window.visualViewport
  if (!vv) return

  const lost = window.innerHeight - vv.height - vv.offsetTop
  const open = lost > 100

  gameStore.setKeyboardOpen(open)
  keyboardOffset.value = open ? Math.max(0, lost) : 0
}


function addListeners() {
  const vv = window.visualViewport
  if (!vv) return


  vv.addEventListener('resize', updateKeyboardState)
  vv.addEventListener('scroll', updateKeyboardState)
  updateKeyboardState()
}

function removeListeners() {
  const vv = window.visualViewport
  if (!vv) return
  vv.removeEventListener('resize', updateKeyboardState)
  vv.removeEventListener('scroll', updateKeyboardState)
}

onBeforeUnmount(() => {
  window.removeEventListener('keyup', onGlobalKeydown, { capture: true })
  stopBadgeCountdown()
  subscribeNameInput()
  clearInterval(countdownTimer)
})

const subscribeNameInput = gameStore.$onAction(({ name, after, onError }) => {
  if (name !== 'submitName') return

  after((correct) => {
    if(name === 'submitName') {
      triggerShowBadge()
    }


  })
})

</script>


<style scoped>

@keyframes shake {
  0%   { transform: translateX(0); }
  15%  { transform: translateX(-8px); }
  30%  { transform: translateX(8px); }
  45%  { transform: translateX(-6px); }
  60%  { transform: translateX(6px); }
  75%  { transform: translateX(-3px); }
  90%  { transform: translateX(3px); }
  100% { transform: translateX(0); }
}

.shake {
  animation: shake 300ms ease-in-out;
  /* optional: emphasize the error state while shaking */
}

</style>