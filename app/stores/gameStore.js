export const GameStateLoading = 'GameStateLoading'
export const GameStatePlaying = 'GameStatePlaying'
export const GameStateError   = 'GameStateError'
export const GameStates = [GameStateLoading, GameStatePlaying, GameStateError]

export const useGameStore = defineStore('game-store', () => {
    const gameState = ref(GameStateLoading)
    const errorMessage = ref(null)
    const isLoading = ref(false)
    
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
    
    function isError()        { return gameState.value === GameStateError  }
    function isLoadingState() { return gameState.value === GameStateLoading }
    
    function setGameState(next) {
        if (GameStates.includes(next)) gameState.value = next
    }
    
    async function loadRandomPokemon() {
        try {
            isLoading.value = true
            pokemon.value.imageReady = false
            gameState.value = GameStateLoading
            errorMessage.value = null
            pokemon.value = { id: null, name: null, flavor: null, imageUrl: null, revealed: false }
            
            const data = await $fetch('/api/random-pokemon')
            
            if (!data || data.error) {
                gameState.value = GameStateError
                errorMessage.value = String(data?.error || 'Unknown error')
                return
            }
            
            pokemon.value = {
                id: data.id,
                name: data.name,
                flavor: data.flavor,
                imageUrl: data.imageUrl,
                revealed: false,
            }
            gameState.value = GameStatePlaying
            
            
        } catch (e) {
            gameState.value = GameStateError
            errorMessage.value = 'Failed to load Pokémon. Please try again.'
        } finally {
            isLoading.value = false
            console.log(pokemon.value.flavor)
        }
    }
    
    return {
        gameState, errorMessage, isLoading, pokemon,
        revealPokemon, setGameState, loadRandomPokemon,
        isError, isLoadingState,
    }
})
