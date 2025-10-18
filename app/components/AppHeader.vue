<template>
  <div class="flex flex-row items-center pt-5">
    <button class="btn btn-normal xl:hidden">
      <Icon name="mdi:cogs" />
    </button>
    <div class="flex-1"></div>
    <div class="flex flex-row gap-x-2">
      <button @click="toggleMode" class="btn btn-normal">
        <Icon :name="iconName" />
      </button>
      <button class="btn btn-normal xl:hidden">
        <Icon name="material-symbols:leaderboard-outline" />
      </button>

    </div>
  </div>
</template>
<script setup>
  const colorMode = useColorMode()
  const iconName = computed(() => colorMode.value === 'dark' ? 'material-symbols-light:light-mode' : 'material-symbols-light:dark-mode')
  function toggleMode() {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
    document.getElementById('pokemon-input').focus()
  }
</script>