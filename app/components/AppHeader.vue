<template>
  <div class="flex flex-row p-5">
    <NuxtLink to="/">
      <h1 class=" text-2xl title">Guess The Pokemon!</h1>
    </NuxtLink>
    <div class="flex-1"></div>
    <button @click="toggleMode" class="btn btn-normal">
      <Icon :name="iconName" />
    </button>
  </div>
</template>
<script setup>
  const colorMode = useColorMode()
  const iconName = computed(() => colorMode.value === 'dark' ? 'material-symbols-light:light-mode' : 'material-symbols-light:dark-mode')
  function toggleMode() {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
    console.log(colorMode.value)
  }
</script>