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
import * as commonStyle from '../../utils/commonStyle';

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
    <View style={styles.main_container}>
      <View style={styles.title_container}>
        <Text style={styles.text_title}>Pokédex Application</Text>
      </View>
      <View style={styles.pokemon_container}>
      <PokemonInfo id={listPoke[counterPokedex].id} name={listPoke[counterPokedex].name} level={listPoke[counterPokedex].level}
        isMale={listPoke[counterPokedex].isMale} src={listPoke[counterPokedex].src} onClickPokemon={modifyLevel} />
        </View>
        <View style={styles.button_container}>
        <TouchableOpacity
            style={styles.buttonNextPrevious}
            onPress={() => onPrevious()}
            >
              <Image source={require('../../assets/icons/left-arrow.png')} style={styles.iconButton} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonNextPrevious}
            onPress={() => onNext()}
            >
              <Image source={require('../../assets/icons/right-arrow.png')} style={styles.iconButton} />
          </TouchableOpacity>
      </View>
    </View>
  );
};


const PokemonInfo = ({ name, level, isMale, src, onClickPokemon }: Pokemon) => {

  return (
    <>
      <Text style={styles.text_appeared}>A new Pokemon appeared !</Text>
      <TouchableOpacity
        onPress={() => onClickPokemon()}
      >
        <Image source={src} style={styles.imagePokemon} />
      </TouchableOpacity>
      <Text>His name is {name}, his levelPokemon is {level}.</Text>
      {isMale ?
        <Text>This is a male</Text>
        : <Text>This is a female</Text>
      }
    </>
  )
}


const styles = StyleSheet.create({
  main_container: {
      flex: 1
  },

  title_container: {
    flex: 1,
    alignItems: 'center'
  },

  pokemon_container: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center'
  },

  button_container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around'
  },

  text_title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'rgb(200, 0, 0)',
    marginTop:  30
  },
  imagePokemon: {
    width: 200,
    height: 200,
  },

  iconButton: {
    width: 40,
    height: 40
  },

  text_appeared: {
    marginBottom: 20,
    fontStyle: 'italic',
    fontSize: 18
  },

  // @ts-ignore
  buttonNextPrevious: {
    ...commonStyle.elevationButton,
    ...commonStyle.roundedButton
  }
});

export default HomeView;