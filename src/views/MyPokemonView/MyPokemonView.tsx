import React, { useEffect, useState } from 'react';
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
import { Card, ListItem, Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { listPokeOriginal } from '../../data/PokemonList';
import { Pokemon } from '../../models/Pokemon';
import * as commonStyle from '../../utils/commonStyle';

const MyPokemonView = (props: any) => {

    const onViewPokemonDetails = (idPokemon: number, namePokemon: string, srcPokemon: string) => {
        props.navigation.navigate('Details', {
            id: idPokemon,
            name: namePokemon,
            src: srcPokemon,
            isReleasePossible: true
        });
    }

    return (
        <View>
            <FlatList
                data={props.arrayPokemonCaptured}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                    <PokemonItem pokemon={item} onClickPokemon={onViewPokemonDetails}/>}
            />
        </View>
    );
};


const PokemonItem = (props: any) => {

    const { pokemon, onClickPokemon, onReleasePokemon } = props;

    return (
        <View>
            <TouchableOpacity style={styles.main_container} onPress={() => onClickPokemon(pokemon.id, pokemon.name, pokemon.src)}>
                <Image
                    style={styles.image}
                    source={{ uri: pokemon.src }}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{pokemon.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.level_text}>
                            Level: {pokemon.level}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    imagePokemon: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    details_container: {
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10,
        ...commonStyle.elevationButton,
    },

    main_container: {
        flexDirection: 'row',
    },
    image: {
        width: 60,
        height: 60,
        margin: 5,
        borderRadius: 30,
    },
    divider_pokemon: {
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '14%',
    },

    content_container: {
        flex: 1,
        margin: 5,
    },
    header_container: {
        flex: 3,
        flexDirection: 'row',
    },
    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
    },
    level_text: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12,
        color: '#666666',
    },
});


const mapStateToProps = (state: any) => {
    return {
        arrayPokemonCaptured: state.arrayPokemonCaptured.arrayPokemonCaptured
    };
};

  
export default connect(mapStateToProps)(MyPokemonView);