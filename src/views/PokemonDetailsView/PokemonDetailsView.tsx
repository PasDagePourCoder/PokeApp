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
import * as commonStyle from '../../utils/commonStyle';

const PokemonDetailsView = (props: any) => {

    /* 2. Get the param */
    const { id, name, src, isReleasePossible } = props.route.params;
    const [weight, setWeight] = useState(undefined);
    const [height, setHeight] = useState(undefined);
    const [arrayTypes, setArrayTypes] = useState([]);

    const releasePokemon = (idPokemon: number) => {
        const action = { type: 'REMOVE_POKEMON_IN_LIST', value: idPokemon};
        props.dispatch(action);  
    }


    useEffect(() => {
        fetchPokemonDetails(id);
    }, [id]);

    const fetchPokemonDetails = (idPokemon: number) => {
        const url = 'https://pokeapi.co/api/v2/pokemon/' + idPokemon;

        fetch(url)
            .then(response => response.json())
            .then(json => {
                setHeight(json.height);
                setWeight(json.weight);

                setArrayTypes(json.types.map((item: any) => {
                    return item.type.name;
                }));

                console.log('ArrayTypes ', arrayTypes);

            })
            .catch(error => {
                console.log('Error: ', error);
            })

    }

    return (
        <View>
            <Card>
                <Card.Title>{name}</Card.Title>
                <Card.Divider />
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={styles.imagePokemon}
                            source={{ uri: src }}
                        />
                    </View>
                    <View style={styles.details_container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text>Height: {height}</Text>
                            <Text>Weight: {weight}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text>Types:
                                {arrayTypes.length !== 0 &&
                                    arrayTypes.map((item, index) => <Text key={index}> {item} & </Text>)
                                }
                            </Text>
                        </View>
                    </View>
                </View>
                {isReleasePossible && <Button title="Release the Pokemon" onPress={() => releasePokemon(id)} />}
            </Card>
        </View>
    );
};



const styles = StyleSheet.create({
    imagePokemon: {
        width: 300,
        height: 300
    },
    details_container: {
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 10,
        ...commonStyle.elevationButton,
    }
});



const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch: (action: any) => { dispatch(action); },
    };
};


export default connect(mapDispatchToProps)(PokemonDetailsView);