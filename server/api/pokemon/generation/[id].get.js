export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const MAX_TRIES = 6;
    let success = false
    let result = null
    for (let i = 0; i < MAX_TRIES; i++) {
        result = await $fetch(`https://pokeapi.co/api/v2/generation/${id}/`)
        
        if(!result) continue;
        return result
    }
    
    if (success) {
        return result;
    } else {
        setResponseStatus(event, 503);
        return { error: "No suitable Pokémon found. Please try again." };
    }
});