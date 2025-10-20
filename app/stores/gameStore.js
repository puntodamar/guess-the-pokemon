import {capitalizeFirstLetter} from "~/composables/capitalize.js";
import {getPokemon, randomInt} from "~/composables/getPokemon.js";

export const GameStateLoading = 'GameStateLoading'
export const GameStatePlaying = 'GameStatePlaying'
export const GameStateError   = 'GameStateError'
export const GameStateInit = 'GameStateInit'
export const GameStates = [GameStateLoading, GameStatePlaying, GameStateError, GameStateInit]

export const useGameStore = defineStore('game-store', () => {
    const gameState = ref(GameStateInit)
    const errorMessage = ref(null)
    const isLoading = ref(false)
    const userInput = ref(null)
    const mobileKeyboardOpen = ref(false)
    const inputResult = ref(null)
    const generation = ref('all')
    const speciesList = ref([])
    let totalGeneration = null
    const points = reactive({ point: 0, currentStreak: 0, longestStreak: 0})
    const controls = reactive({audio: true})
    
    const pokemon = ref({
        id: null,
        name: null,
        flavor: null,
        imageUrl: null,
        revealed: false,
        imageReady: false,
        cry: null,
    })
    
    function revealPokemon() {
        if (gameState.value === GameStatePlaying) {
            pokemon.value.revealed = true
        }
    }
    
    function setKeyboardOpen(value) {
        mobileKeyboardOpen.value = value
    }
    
    function resetUserInput() {
        userInput.value = null
    }
    
    async function setGeneration(gen) {
        if(generation.value !== gen) {
            generation.value = gen
            if (generation.value !== null) {
                await updatePokemonSpecies()
            }
        }
    }
    
    function isError()        { return gameState.value === GameStateError  }
    function isLoadingState() { return gameState.value === GameStateLoading }
    
    function setGameState(next) {
        if (GameStates.includes(next)) gameState.value = next
    }
    
    function submitName() {
        
        if(pokemon.value.name === capitalizeFirstLetter(userInput.value)) {
            points.currentStreak += 1
            points.point += 1
            inputResult.value = true
            return true
        } else {
            if (points.currentStreak >= 0 && points.longestStreak < points.currentStreak ) {
                points.longestStreak = points.currentStreak
            }
            points.currentStreak = 0
            inputResult.value = false
            // userInput.value = ""
            return false
        }
        

    }
    
    function clearResult() {
        inputResult.value = null
    }
    
    function toggleAudio() {
        controls.audio = !controls.audio
    }
    
    
    async function getGeneration(){
        if(totalGeneration) return totalGeneration;
        
        const data = await $fetch('/api/generation/')
        if (!data || data.error) {
            gameState.value = GameStateError
            errorMessage.value = String(data?.error || 'Unknown error')
            
        }
        
        totalGeneration = data.count
        return totalGeneration
        
    }
    async function loadRandomPokemon() {
        console.log("loadRandomPokemon")
        try {
            userInput.value = null
            isLoading.value = true
            pokemon.value.imageReady = false
            gameState.value = GameStateLoading
            errorMessage.value = null
            pokemon.value = { id: null, name: null, flavor: null, imageUrl: null, revealed: false }
            
            let url = ""
            let data =  null
            
            if (generation.value !== 'all') {
                let success = false
                const randomSpecies = randomInt(0, speciesList.value.length-1)
                for (let i = 0; i < 6; i++) {
                    [success, data] = await getPokemon(randomSpecies)
                    if(success) break;
                }
            } else {
                url = '/api/pokemon/random'
                data = await $fetch(url)
            }
            
            if (!data || data.error) {
                gameState.value = GameStateError
                errorMessage.value = String(data?.error || 'Unknown error')
                return
            }
            

            
            pokemon.value = {
                id: data.id,
                name: capitalizeFirstLetter(data.name),
                flavor: data.flavor,
                imageUrl: data.imageUrl,
                cry: data.cryUrl,
                revealed: false,
            }
            gameState.value = GameStatePlaying
            getBaseAudio(data.cryUrl)
            
        } catch (e) {
            gameState.value = GameStateError
            errorMessage.value = 'Failed to load Pokémon. Please try again.'
            console.log(e)
        } finally {
            isLoading.value = false
        }
    }
    
    async function updatePokemonSpecies() {
        const url = `/api/pokemon/generation/${generation.value}`
        let data = await $fetch(url)
        
        if (!data || data.error) {
            gameState.value = GameStateError
            errorMessage.value = String(data?.error || 'Unknown error')
            return false
        }
        
        console.log('dadada',data.pokemon_species)
        
        speciesList.value = data.pokemon_species.map(s => {
            const parts = s.url.split("/");
            return parts[parts.length - 2];
        });
        
        return true
    }
    
    function getBaseAudio(url) {
        const audio = new Audio(url)
        audio.preload = 'auto'
        audio.crossOrigin = 'anonymous' //
        return audio
    }
    
    function playPokemonCry() {
        const cry = pokemon.value.cry
        if(!cry) return
        
        const base = getBaseAudio(cry)
        const instance = base.cloneNode()
        instance.play()
    }
    
    return {
        gameState, errorMessage, isLoading, pokemon, userInput, mobileKeyboardOpen, points, inputResult, generation, speciesList,
        revealPokemon, setGameState, loadRandomPokemon,getGeneration, resetUserInput, setGeneration, setKeyboardOpen, submitName, controls,
        clearResult, toggleAudio, playPokemonCry,
        isError, isLoadingState,
    }
})
