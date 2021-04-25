// Store/configureStore.js

import AsyncStorage from '@react-native-community/async-storage';
import {combineReducers, createStore} from 'redux';
import { persistCombineReducers } from 'redux-persist';
import { persistReducer,persistStore } from 'redux-persist';
import setArrayPokemonCaptured from './reducers/arrayPokemonCapturedReducer';
import setCurrentUserID from "./reducers/userIDReducer";

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    arrayPokemonCaptured: setArrayPokemonCaptured,
    userIDStore: setCurrentUserID
});

export default createStore(persistReducer(rootPersistConfig, rootReducer));
