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
import {connect, useSelector} from 'react-redux';
import { listPokeOriginal } from '../../data/PokemonList';
import { Pokemon } from '../../models/Pokemon';
import * as commonStyle from '../../utils/commonStyle';
import firestore from "@react-native-firebase/firestore";
import User from "../../models/User";
import {shuffle} from "../../utils/utils";

const TrainersList = (props: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [trainersList, setTrainersList] = useState<User[]>([]);
    const currentUserID = useSelector((state: any) => state.userIDStore.userID);


    useEffect(() => {
        getUserFromFirebase();
    }, []);

    const onViewTrainer = (otherUser: User) => {
        props.navigation.navigate('TrainerDetails', {
            otherUser: otherUser,
            currentUserID: currentUserID
        });
    };

    const getUserFromFirebase = () => {
        console.log('Querying People from Firebase');
        // noinspection JSUnresolvedFunction
        firestore().collection('users')
            .limit(100)
            .get()
            .then(querySnapshot => {
                let listUsers: User[] = [];
                querySnapshot.forEach(doc => {
                    //@ts-ignore
                    listUsers.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                listUsers = listUsers.filter((user: User) => user.id !== currentUserID);
                setTrainersList(shuffle(listUsers));
                console.log('Users have been received.');
            });
    }

    return (
        <View>
            <FlatList
                data={trainersList}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) =>
                    <TrainerItem userDetail={item} onViewTrainer={onViewTrainer}/>}
            />
        </View>
    );
};

interface IProps {
    userDetail: User,
    onViewTrainer: any
}

const TrainerItem = ({userDetail, onViewTrainer}: IProps) => {

    return (
        <View>
            <TouchableOpacity style={styles.main_container} onPress={() => onViewTrainer(userDetail)}>
                <Image
                    style={styles.image}
                    source={{ uri: userDetail.image }}
                />
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{userDetail.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.level_text}>
                            Pokémon favori: {userDetail.favoritePokemon}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};


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


export default TrainersList;
