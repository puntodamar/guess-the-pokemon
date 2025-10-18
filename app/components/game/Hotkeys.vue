<template>
  <div>
    <h3 class="ui-label mb-3">Hotkeys</h3>

    <div class="flex flex-col gap-y-2">
<!--      <div class="flex items-center gap-6">-->
<!--        <span class="w-20 text-left ui-text ">Skip</span>-->
<!--        <span class="hotkey">-->
<!--              <Icon name="material-symbols:shift-lock-outline" class="w-4 h-4 shrink-0 ui-text "/>-->
<!--              <span class="ui-text text-xs">L Shift</span>-->
<!--            </span>-->
<!--      </div>-->

      <div class="flex items-center gap-6">
        <span class="w-20 text-left ui-text ">Clear</span>
        <span class="hotkey">
              <Icon name="mingcute:space-line" class="w-4 h-4 shrink-0 ui-text "/>
              <span class="ui-text text-xs">Space</span>
            </span>
      </div>

      <div class="flex items-center gap-6">
        <span class="w-20 text-left ui-text ">Submit</span>
        <span class="hotkey">
              <Icon name="uiw:enter" class="w-4 h-4 shrink-0 ui-text "/>
              <span class="ui-text text-xs">Enter</span>
            </span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>