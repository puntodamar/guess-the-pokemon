export default defineEventHandler(async () => {
    const generations = await $fetch("https://pokeapi.co/api/v2/generation");
    return generations;
})