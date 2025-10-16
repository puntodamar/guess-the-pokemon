<template>
  <div class="min-h-dvh flex flex-col ">
    <app-header/>
    <slot />
    <app-footer/>
  </div>
</template>
<script setup>
import AppFooter from "~/components/AppFooter.vue";
import AppHeader from "~/components/AppHeader.vue";
</script>