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

  let classes = props.classes;
  if (props.mode === 'desktop') return classes;
  classes += gameStore.mobileKeyboardOpen ? " mb-15" : " mb-30"
  return classes;
})

const pokemonNameClass = computed(() => {
  console.log(props.mode)
  let classes = "";

  if(!gameStore.pokemon.imageReady) classes += "invisible";

  classes += gameStore.mobileKeyboardOpen ? "text-xl lg:text-5xl" : " text-2xl lg:text-5xl";
  return classes;
})

const vowels = ['A', 'I', 'U', 'E', 'O'];
const formatVowels = computed(() => vowels.includes(gameStore?.pokemon?.name?.charAt(0)) ? "It's an" : "It's a")
</script>