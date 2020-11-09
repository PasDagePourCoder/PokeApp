import {Pokemon} from "../../models/Pokemon";


const initialState = { arrayPokemonCaptured: [] };

function setArrayPokemonCaptured(state = initialState, action: { type: string; value: any; }) {
    let nextState;
    switch (action.type) {
        case 'ADD_TO_LIST_POKEMON':
            nextState = {
                ...state,
                arrayPokemonCaptured: [...state.arrayPokemonCaptured, action.value],
            };
            console.log('[STORE] Add to pokemons captured: ', action.value);
            return nextState || state;  // Penser a retourner les deux
        case 'REMOVE_POKEMON_IN_LIST':
            nextState = {
                ...state,
                arrayPokemonCaptured: state.arrayPokemonCaptured.filter((pokemon: Pokemon) => pokemon.id !== action.value)
            };
            console.log('[STORE] Delete the Pokemon ID: ', action.value);
            return nextState || state;
        default:
            return state;
    }
}

export default setArrayPokemonCaptured;
