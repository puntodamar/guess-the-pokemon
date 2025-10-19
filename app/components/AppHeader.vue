<template>
  <div class="fixed inset-x-0 top-0 z-50 w-full flex flex-row items-center px-3 md:px-10 pt-3 md:pt-5">
    <div class="flex flex-row gap-2">
      <button class="btn btn-normal xl:hidden" @click="openDialogLeft = true">
        <Icon name="mdi:cogs" />
      </button>
      <button @click="gameStore.toggleAudio" class="btn btn-normal xl:hidden">
        <Icon :name="soundClass" size="1rem" />
      </button>
    </div>

    <div class="flex-1 min-w-0"></div>

    <div class="flex flex-row gap-x-2">
      <button @click="gameStore.toggleAudio" class="btn btn-normal hidden xl:block">
        <Icon :name="soundClass" size="1rem" />
      </button>
      <button @click="toggleMode" class="btn btn-normal">
        <Icon :name="iconName" size="1rem" />
      </button>
      <button class="btn btn-normal xl:hidden" @click="openDialogRight = true">
        <Icon name="material-symbols:leaderboard-outline" />
      </button>
    </div>

    <SlideOverDialog v-model="openDialogLeft" side="left" width-class="max-w-sm">
      <div class="space-y-4">
        <generation-selector title-margin="mb-10" text-alignment="center"/>
      </div>

      <template #footer>
        <app-footer/>
      </template>
    </SlideOverDialog>

    <SlideOverDialog v-model="openDialogRight" side="right" width-class="max-w-sm">
      <div class="space-y-4">
        <game-info text-aligment="text-center" />
      </div>

      <template #footer>
        <app-footer/>
      </template>
    </SlideOverDialog>
  </div>
</template>

<script setup>
  import {useGameStore} from "~/stores/gameStore.js";
  import SlideOverDialog from "../components/SlideOverDialog.vue";
  import GenerationSelector from "~/components/game/GenerationSelector.vue";
  import GameInfo from "~/components/game/GameInfo.vue";

  const openDialogLeft = ref(false)
  const openDialogRight = ref(false)

  const colorMode = useColorMode()
  const gameStore = useGameStore()
  const iconName = computed(() => colorMode.value === 'dark' ? 'material-symbols-light:light-mode' : 'material-symbols-light:dark-mode')
  function toggleMode() {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
    document.getElementById('pokemon-input').focus()
  }

  const soundClass = computed(() => gameStore.controls.audio === true ? 'tdesign:sound' : 'quill:sound')
</script>