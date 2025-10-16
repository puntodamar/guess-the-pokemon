function cleanFlavor(text) {
    return String(text || "")
        .replace(/[\n\f]+/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();
}

function randInt(min, max) {
    const lo = Math.ceil(min);
    const hi = Math.floor(max);
    return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}

function normalizeLetters(s) {
    return String(s || "").toLowerCase().replace(/[^a-z]/g, "");
}

export default defineEventHandler(async () => {
    const speciesMeta = await $fetch("https://pokeapi.co/api/v2/pokemon-species?limit=1");
    const total = speciesMeta?.count || 1010;
    
    const MAX_TRIES = 6;
    for (let i = 0; i < MAX_TRIES; i++) {
        const id = randInt(1, total);
        
        const species = await $fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).catch(() => null);
        if (!species) continue;
        const nameKey = normalizeLetters(species.name);
        
        const englishEntries = (species.flavor_text_entries || [])
            .filter((e) => e?.language?.name === "en")
            .map((e) => cleanFlavor(e?.flavor_text))
            .filter(Boolean)
            .filter((txt) => {
                const txtKey = normalizeLetters(txt);
                return !txtKey.includes(nameKey);
            });
        
        if (!englishEntries.length) {
            continue;
        }
        
        const flavor = englishEntries[randInt(0, englishEntries.length - 1)];
        
        const pokemon = await $fetch(`https://pokeapi.co/api/v2/pokemon/${species.id}`).catch(() => null);
        if (!pokemon) continue;
        
        const cryUrl = pokemon?.cries?.latest || pokemon?.cries?.legacy || null;
        
        const art =
            pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
            pokemon?.sprites?.other?.dream_world?.front_default ||
            pokemon?.sprites?.front_default ||
            "";
        
        if (!art) continue;
        
        return {
            id: species.id,
            name: species.name,
            flavor,
            imageUrl: art,
            cryUrl,
        };
    }
    
    setResponseStatus(event, 503);
    return { error: "No suitable Pokémon found. Please try again." };
});
