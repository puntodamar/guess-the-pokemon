<template>
  <div class="min-h-dvh flex flex-col mx-3 md:mx-5">
    <app-header/>
    <slot />
    <app-footer class="hidden md:block"/>
  </div>
</template>
<script setup>
import AppFooter from "~/components/AppFooter.vue";
import AppHeader from "~/components/AppHeader.vue";
</script>