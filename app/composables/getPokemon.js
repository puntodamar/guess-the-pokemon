function cleanFlavor(text) {
    return String(text || "")
        .replace(/[\n\f]+/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();
}

function randomInt(min, max) {
    const lo = Math.ceil(min);
    const hi = Math.floor(max);
    return Math.floor(Math.random() * (hi - lo + 1)) + lo;
}



function normalizeLetters(s) {
    return String(s || "").toLowerCase().replace(/[^a-z]/g, "");
}

async function getPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`
    console.log("getPokemon", url)
    const species = await $fetch(url).catch(() => null);
    if (!species) return [false, null];
    
    
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
        return [false, null];
    }
    
    const flavor = englishEntries[randomInt(0, englishEntries.length - 1)];
    
    const pokemon = await $fetch(`https://pokeapi.co/api/v2/pokemon/${species.id}`).catch(() => null);
    if (!pokemon) return [false, null];
    
    const cryUrl = pokemon?.cries?.latest || pokemon?.cries?.legacy || null;
    
    const art =
        pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
        pokemon?.sprites?.other?.dream_world?.front_default ||
        pokemon?.sprites?.front_default ||
        "";
    
    if (!art) return [false, null];
    
    return [true, {
        id: species.id,
        name: species.name,
        flavor,
        imageUrl: art,
        cryUrl,
    }];
}


export {getPokemon, cleanFlavor, randomInt, normalizeLetters};