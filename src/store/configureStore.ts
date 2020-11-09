// Store/configureStore.js

import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers, createStore} from 'redux';
import { persistCombineReducers } from 'redux-persist';
import { persistReducer,persistStore } from 'redux-persist';
import setArrayPokemonCaptured from './reducers/arrayPokemonCapturedReducer';

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    arrayPokemonCaptured: setArrayPokemonCaptured
});

export default createStore(persistReducer(rootPersistConfig, rootReducer));
