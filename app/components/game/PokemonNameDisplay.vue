<template>

  <div class="text-center" :class="classes">
    <p class="font-ui text-2xl lg:text-5xl font-semibold tracking-tight mr-5 text-text text-center mt-20 xl:mt-0" :class="questionClasses">Guess The Pokemon</p>
    <span class="font-ui text-2xl lg:text-5xl font-semibold tracking-tight mr-5 text-text" :class="{invisible: !gameStore.controls.showBadge}">{{formatVowels}}</span>
    <span class="font-pokemon title title-outline" :class="pokemonNameClass">{{`${gameStore.pokemon.name} !`}}</span>
  </div>
</template>
<script setup>
import {useGameStore} from "~/stores/gameStore";

const props = defineProps({
  classes: {type: String},
  mode: {type: String, required: true},
})
const gameStore = useGameStore();

const questionClasses = computed(() => {
  let classes = []
  // classes.push(gameStore.mobileKeyboardOpen ? " mb-15" : " mb-30")
  classes.push(gameStore.controls.showBadge ? "invisible" : "visible")
  return classes
})

const classes = computed(() => {

  let classes = props.classes.split(" ");
  if (props.mode === 'desktop') return classes;
  classes.push(gameStore.mobileKeyboardOpen ? " mb-15" : " mb-30")
  classes.push(gameStore.inputResult !== null ? "visible" : "invisible")
  return classes;
})

const pokemonNameClass = computed(() => {
  let classes = [];

  if(!gameStore.controls.showBadge) classes.push("invisible");
  classes.push(gameStore.mobileKeyboardOpen ? "text-xl lg:text-5xl" : " text-2xl lg:text-5xl") ;
  return classes;
})

const vowels = ['A', 'I', 'U', 'E', 'O'];
const formatVowels = computed(() => vowels.includes(gameStore?.pokemon?.name?.charAt(0)) ? "It's an" : "It's a")
</script>