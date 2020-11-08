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
import * as commonStyle from '../../utils/commonStyle';

const PokemonDetailsView = (props: any) => {

    /* 2. Get the param */
    const { id, name, src } = props.route.params;
    const [weight, setWeight] = useState(undefined);
    const [height, setHeight] = useState(undefined);
    const [arrayTypes, setArrayTypes] = useState([]);


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

export default PokemonDetailsView;