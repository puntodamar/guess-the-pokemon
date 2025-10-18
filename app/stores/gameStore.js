import {capitalizeFirstLetter} from "~/composables/capitalize.js";

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
    let generation = null
    let totalGeneration = null
    const points = reactive({ point: 0, currentStreak: 0, longestStreak: 0})
    
    const pokemon = ref({
        id: null,
        name: null,
        flavor: null,
        imageUrl: null,
        revealed: false,
        imageReady: false
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
    
    function setGeneration(gen) {
        generation = gen
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
    
    
    async function getGeneration(){
        if(totalGeneration) return totalGeneration;
        
        const data = await $fetch('/api/generation')
        if (!data || data.error) {
            gameState.value = GameStateError
            errorMessage.value = String(data?.error || 'Unknown error')
            
        }
        
        totalGeneration = data.count
        return totalGeneration
        
    }
    async function loadRandomPokemon() {
        try {
            userInput.value = null
            isLoading.value = true
            pokemon.value.imageReady = false
            gameState.value = GameStateLoading
            errorMessage.value = null
            pokemon.value = { id: null, name: null, flavor: null, imageUrl: null, revealed: false }
            
            let url = '/api/random-pokemon'
            if(generation) url += `?gen=${generation}`
            const data = await $fetch(url)
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
                revealed: false,
            }
            gameState.value = GameStatePlaying
            console.log("load pokemon")
            const input = document.getElementById('pokemon-input')
            if(input) input.focus()
            
        } catch (e) {
            gameState.value = GameStateError
            errorMessage.value = 'Failed to load Pokémon. Please try again.'
            console.log(e)
        } finally {
            isLoading.value = false
        }
    }
    
    return {
        gameState, errorMessage, isLoading, pokemon, userInput, mobileKeyboardOpen, points, inputResult,
        revealPokemon, setGameState, loadRandomPokemon,getGeneration, resetUserInput, setGeneration, setKeyboardOpen, submitName,
        clearResult,
        isError, isLoadingState,
    }
})
