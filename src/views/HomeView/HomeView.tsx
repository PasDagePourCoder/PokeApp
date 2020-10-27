import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import { listPokeOriginal } from '../../data/PokemonList';


import { Pokemon } from '../../models/Pokemon';


const HomeView = () => {

  const [counterPokedex, setCounterPokedex] = useState(0);
  const [listPoke, setListPoke] = useState(listPokeOriginal);


  const getNamePokemon = (namePokemon: string) => {
    console.log('My name is', namePokemon);
    console.log('My neighbour is', listPoke[counterPokedex + 1].name);
  }

  const modifyLevel = () => {
    // TODO: Un seul des trois starters ! 
    let newArr = [...listPoke]; // copying the old datas array
    newArr[counterPokedex].level = listPoke[counterPokedex].level + 5;
    setListPoke(newArr);
  }

  const onNext = () => {
    if (counterPokedex === listPoke.length - 1) {
      setCounterPokedex(0);
    } else {
      setCounterPokedex(counterPokedex + 1);
    }
  }

  const onPrevious = () => {
    if (counterPokedex === 0) {
      setCounterPokedex(listPoke.length - 1);
    } else {
      setCounterPokedex(counterPokedex - 1);
    }
  }

  return (
    <View>
      <Text>The value of counter is: {counterPokedex}</Text>
      <Button
        title="Next"
        onPress={() => onNext()}
      />
      <Button
        title="Previous"
        onPress={onPrevious}
      />
      <PokemonInfo id={listPoke[counterPokedex].id} name={listPoke[counterPokedex].name} level={listPoke[counterPokedex].level}
        isMale={listPoke[counterPokedex].isMale} src={listPoke[counterPokedex].src} onClickPokemon={modifyLevel}/>
    </View>
  );
};


const PokemonInfo = ({ name, level, isMale, src, onClickPokemon }: Pokemon) => {

  return (
    <View>
      <Text>This is a Pokemon</Text>
      <Text>His name is {name}, his levelPokemon is {level}.</Text>
      {isMale ?
        <Text>This is a male</Text>
        : <Text>This is a female</Text>
      }
      <TouchableOpacity
        onPress={() => onClickPokemon()}
      >
        <Image source={src} style={styles.imagePokemon} />
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  imagePokemon: {
    width: 200,
    height: 200,
  },
});

export default HomeView;