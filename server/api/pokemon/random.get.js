import {getPokemon, randomInt} from "~/composables/getPokemon.js";

export default defineEventHandler(async (event) => {
    let url = "https://pokeapi.co/api/v2/pokemon-species?limit=1"

    const speciesMeta = await $fetch(url);
    const total = speciesMeta?.count || 1010;
    let success = false
    let pokemon = null
    const MAX_TRIES = 6;
    
    for (let i = 0; i < MAX_TRIES; i++) {
        const id = randomInt(1, total);
        [success, pokemon] = await getPokemon(id)
        if(success) break;
    }
    
    if (success) {
        return pokemon;
    } else {
        setResponseStatus(event, 503);
        return { error: "No suitable Pokémon found. Please try again." };
    }
    

});
