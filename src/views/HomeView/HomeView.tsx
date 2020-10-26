import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};


const HomeView = () => {

    const name = 'Pikachu';
    const level: number = 15;
    const isMale: boolean = false;

  return (
    <View>
        <PokemonInfo name={'Pokemon'} level={level} isMale={isMale} src={require('../../assets/images/25.png')}/>
        <PokemonInfo name={'Scrabrute'} level={56} isMale={false} src={require('../../assets/images/127.png')}/>
    </View>
  );
};

type PokemonInfoType = {
    name: string;
    level: number;
    isMale: boolean;
    src: any;
}

const PokemonInfo = ({name, level, isMale, src}: PokemonInfoType) => {

    return (
        <View>
            <Text>This is a Pokemon</Text>
            <Text>His name is {name}, his levelPokemon is {level}.</Text>
            {isMale ?
            <Text>This is a male</Text>
        : <Text>This is a female</Text>
        }
            <Image source={src} style={styles.imagePokemon}/>
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