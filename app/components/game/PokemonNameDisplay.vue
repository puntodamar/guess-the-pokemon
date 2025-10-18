<template>
  <p class="text-center" :class="classes">
    <span class="font-ui text-2xl lg:text-5xl font-semibold tracking-tight mr-5 text-text" :class="{invisible: !gameStore.pokemon.imageReady}">{{formatVowels}}</span>
    <span class="font-pokemon title title-outline" :class="pokemonNameClass">{{`${gameStore.pokemon.name} !`}}</span>
  </p>
</template>
<script setup>
import {useGameStore} from "~/stores/gameStore";

const props = defineProps({
  classes: {type: String},
  mode: {type: String, required: true},
})
const gameStore = useGameStore();

const classes = computed(() => {

  let classes = props.classes.split(" ");
  if (props.mode === 'desktop') return classes;
  classes.push(gameStore.mobileKeyboardOpen ? " mb-15" : " mb-30")
  classes.push(gameStore.inputResult !== null ? "visible" : "invisible")
  return classes;
})

const pokemonNameClass = computed(() => {
  let classes = [];

  if(!gameStore.pokemon.imageReady) classes.push("invisible");
  classes.push(gameStore.mobileKeyboardOpen ? "text-xl lg:text-5xl" : " text-2xl lg:text-5xl") ;
  return classes;
})

const vowels = ['A', 'I', 'U', 'E', 'O'];
const formatVowels = computed(() => vowels.includes(gameStore?.pokemon?.name?.charAt(0)) ? "It's an" : "It's a")
</script>