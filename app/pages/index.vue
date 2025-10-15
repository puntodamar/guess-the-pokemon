<template>
  <section class="flex flex-1 flex-col">
    <div class="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <div class="w-full max-w-2xl">
        <h1 class="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
          Guess the Pokémon
        </h1>

        <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <!-- Flavor text -->
          <p class="text-slate-200 text-lg leading-relaxed">
            <span v-if="state.loading">Loading a random Pokédex entry…</span>
            <span v-else-if="state.error" class="text-rose-400">{{ state.error }}</span>
            <span v-else>{{ state.flavor }}</span>
          </p>

          <!-- Blurred image card -->
          <div class="mt-6 flex items-center justify-center">
            <div
                class="relative w-64 h-64 md:w-80 md:h-80 bg-slate-800 rounded-2xl overflow-hidden ring-1 ring-slate-700"
            >
              <img
                  v-if="state.imageUrl"
                  :src="state.imageUrl"
                  alt="Mystery Pokémon"
                  class="absolute inset-0 w-full h-full object-contain transition-[filter,transform] duration-500"
                  :style="state.revealed ? {} : { filter: 'brightness(0) contrast(200%)' }"
                  loading="lazy"
              />
              <div
                  v-if="!state.imageUrl && !state.loading"
                  class="absolute inset-0 grid place-items-center text-slate-400"
              >
                No image
              </div>
            </div>
          </div>

          <!-- Controls -->
          <div class="mt-6 flex flex-wrap gap-3">
            <button
                class="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium disabled:opacity-50"
                :disabled="state.loading || state.revealed || !!state.error"
                @click="reveal"
            >
              Reveal
            </button>

            <button
                class="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium disabled:opacity-50"
                :disabled="state.loading"
                @click="loadRandom"
            >
              New random
            </button>

            <span v-if="state.revealed && state.name" class="text-slate-300 self-center">
            It’s <span class="font-semibold capitalize">{{ state.name }}</span>!
          </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

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

<style >
/* optional: nicer text rendering */
html, body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
</style>
