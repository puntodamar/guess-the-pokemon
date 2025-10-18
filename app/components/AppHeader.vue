<template>
  <div class="fixed inset-x-0 top-0 z-50 w-full flex flex-row items-center px-3 md:px-10 pt-3 md:pt-5">
    <button class="btn btn-normal xl:hidden" @click="open = true">
      <Icon name="mdi:cogs" />
    </button>
    <button @click="gameStore.toggleAudio" class="btn  xl:hidden btn-normal ml-2">
      <Icon :name="soundClass" size="1rem" />
    </button>

    <div class="flex-1 min-w-0"></div>

    <div class="flex flex-row gap-x-2">
      <button @click="gameStore.toggleAudio" class="hidden xl:block btn btn-normal">
        <Icon :name="soundClass" size="1rem" />
      </button>
      <button @click="toggleMode" class="btn btn-normal">
        <Icon :name="iconName" size="1rem" />
      </button>
      <button class="btn btn-normal xl:hidden">
        <Icon name="material-symbols:leaderboard-outline" />
      </button>
    </div>

    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-100" @close="open = false">
        <div class="fixed inset-0" />

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                <DialogPanel class="pointer-events-auto w-screen max-w-md">
                  <div class="relative flex h-full flex-col overflow-y-auto bg-gray-800 py-6 shadow-xl after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-white/10">
                    <div class="px-4 sm:px-6">
                      <div class="flex items-start justify-between">
                        <DialogTitle class="text-base font-semibold text-white">Panel title</DialogTitle>
                        <div class="ml-3 flex h-7 items-center">
                          <button type="button" class="relative rounded-md text-gray-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500" @click="open = false">
                            <span class="absolute -inset-2.5" />
                            <span class="sr-only">Close panel</span>
<!--                            <XMarkIcon class="size-6" aria-hidden="true" />-->
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="relative mt-6 flex-1 px-4 sm:px-6">
                      <!-- Your content -->
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>
<script setup>
  import {useGameStore} from "~/stores/gameStore.js";

  const colorMode = useColorMode()
  const gameStore = useGameStore()
  const iconName = computed(() => colorMode.value === 'dark' ? 'material-symbols-light:light-mode' : 'material-symbols-light:dark-mode')
  function toggleMode() {
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
    document.getElementById('pokemon-input').focus()
  }

  const soundClass = computed(() => gameStore.controls.audio === true ? 'tdesign:sound' : 'quill:sound')


  import { ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  // import { XMarkIcon } from '@heroicons/vue/24/outline'

  const open = ref(false)
</script>