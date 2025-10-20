import {getPokemon} from "~/composables/getPokemon.js";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const MAX_TRIES = 6;
    let success = false
    let pokemon = null
    for (let i = 0; i < MAX_TRIES; i++) {
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
