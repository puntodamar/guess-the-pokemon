<template>
  <section class="flex flex-1 flex-col">
    <div class="min-h-screen flex items-center justify-center p-6">
      <div class="w-full max-w-2xl">
        <div class="mt-6 flex items-center justify-center">
          <div class="relative w-64 h-64 md:w-80 md:h-80 ">
            <div class="relative w-full h-full overflow-hidden">
              <img
                  :key="state.imageUrl"
                  :src="state.imageUrl"
                  class="absolute inset-0 w-full h-full object-contain z-0"
                  style="mask: none; -webkit-mask: none;"
                  loading="lazy"
              />

              <div v-show="!state.revealed" class="absolute inset-0 z-10 pointer-events-none" :style="silhouetteClass" aria-hidden="true"></div>
            </div>
          </div>
        </div>

        <p class="text-sm font-poppins text-center text-pretty">
          <span v-if="state.error" class="text-rose-400">{{ state.error }}</span>
          <span v-else>{{ state.flavor }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>

const silhouetteClass = computed(() => {
  return {
    backgroundColor: '#E5E4E2',
    WebkitMaskImage: `url(${state.imageUrl})`,
    maskImage: `url(${state.imageUrl})`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    filter: 'none',
    WebkitMaskComposite: 'source-over',
    maskMode: 'alpha'
  }
})

const state = reactive({
  loading: true,
  error: "",
  id: null,
  name: "",
  flavor: "",
  imageUrl: "",
  revealed: false,
});

async function loadRandom() {
  try {
    state.loading = true;
    state.error = "";
    state.revealed = false;
    state.id = null;
    state.name = "";
    state.flavor = "";
    state.imageUrl = "";

    const data = await $fetch("/api/random-pokemon");
    if (data?.error) {
      state.error = data.error || "Unknown error.";
      return;
    }
    state.id = data.id;
    state.name = data.name;
    state.flavor = data.flavor;
    state.imageUrl = data.imageUrl;
  } catch (e) {
    state.error = "Failed to load Pokémon. Please try again.";
  } finally {
    state.loading = false;
  }
}

function reveal() {
  state.revealed = true;
}

onMounted(loadRandom);
</script>
