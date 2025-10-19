<!-- SlideOver.vue -->
<template>
  <TransitionRoot as="template" :show="modelValue">
    <Dialog class="relative z-100"  @close="emitClose">
      <transition
          enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
          leave="ease-in duration-200"  leave-from="opacity-100" leave-to="opacity-0"
      >
        <div v-if="backdrop" class="fixed inset-0 bg-pokemon-blue/40" />
      </transition>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div class="pointer-events-none fixed inset-y-0 flex max-w-full" :class="side === 'right' ? 'right-0 pl-10 sm:pl-16' : 'left-0 pr-10 sm:pr-16'">
            <!-- Panel -->
            <TransitionChild
                as="template"
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                :enter-from="side === 'right' ? 'translate-x-full' : '-translate-x-full'"
                enter-to="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leave-from="translate-x-0"
                :leave-to="side === 'right' ? 'translate-x-full' : '-translate-x-full'">

              <DialogPanel class="pointer-events-auto w-screen" :class="widthClass">
                <div class="relative flex h-full flex-col overflow-y-auto bg-pokemon-navy py-6 shadow-xl" :class="dividerClass">

                  <!-- Header -->
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <slot name="title" >
                        <DialogTitle v-if="title" class="text-base font-semibold text-white">
                          {{ title }}
                        </DialogTitle>
                      </slot>

                      <div class="ml-3 flex h-7 items-center">
                        <button
                            type="button"
                            class="relative rounded-md text-gray-400 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            @click="emitClose">
                          <span class="absolute -inset-2.5" />
                          <span class="sr-only">Close panel</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Body -->
                  <div class="relative mt-6 flex-1 px-10">
                    <slot />
                  </div>

                  <!-- Footer  -->
                  <div v-if="$slots.footer" class="px-10 mt-4">
                    <slot name="footer" />
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  side: { type: String, default: 'right', validator: v => ['left','right'].includes(v) },
  widthClass: { type: String, default: 'max-w-md' },
  title: { type: String,  },
  backdrop: { type: Boolean, default: true },
  divider: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue'])

const emitClose = () => emit('update:modelValue', false)

const dividerClass = computed(() => {
  if (!props.divider) return ''

  return props.side === 'right'
      ? 'after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-white/10'
      : 'after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-white/10'
})
</script>
