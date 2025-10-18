<template>
  <div class="fixed inset-x-0 top-0 z-50 w-full flex flex-row items-center px-3 md:px-5 pt-3 md:pt-5">
    <button class="btn btn-normal xl:hidden">
      <Icon name="mdi:cogs" />
    </button>

    <div class="flex-1 min-w-0"></div>

    <div class="flex flex-row gap-x-2">
      <button @click="toggleMode" class="btn btn-normal">
        <Icon :name="iconName" size="1rem" />
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