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

const TrainerDetailsView = (props: any) => {

    /* 2. Get the param */
    const { otherUser } = props.route.params;

    return (
        <View>
            <Card>
                <Card.Title>{otherUser.name}</Card.Title>
                <Card.Divider />
                <View>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={styles.imagePokemon}
                               source={{ uri: otherUser.image }}
                        />
                    </View>
                    <View style={styles.details_container}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Text>Age: {otherUser.age}</Text>
                            <Text>Favorite Pokémon: {otherUser.favoritePokemon}</Text>
                        </View>
                    </View>
                </View>
                <Button title="Créer un chat" onPress={() => console.log('Chat Creation')} />
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



export default TrainerDetailsView;
