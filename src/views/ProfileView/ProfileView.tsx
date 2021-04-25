import React, {useEffect, useState} from 'react';
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
    TouchableOpacity, ActivityIndicator,
} from 'react-native';
import {Card, ListItem, Icon} from 'react-native-elements';
import {connect, useSelector} from 'react-redux';
import * as commonStyle from '../../utils/commonStyle';
import User from '../../models/User';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const ProfileView = (props: any) => {

    const userID = useSelector((state: any) => state.userIDStore.userID);
    const [user, setUser] = useState<User>({
        age: 0,
        favoritePokemon: '',
        id: '0',
        image: '../../assets/images/sacha.jpeg',
        name: ''
    });


    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .doc(userID)
            .onSnapshot(documentSnapshot => {
                console.log('User data: ', documentSnapshot.data());
                //@ts-ignore
                setUser(documentSnapshot.data());
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [userID]);


    const onSignOut = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('User signed out!');
                props.navigation.navigate('Login');
            });
    };

    return (
        <View>
            {user.id === '0' ?
                <ActivityIndicator size="large" color="#00ff00" /> :
                <Card>
                    <Card.Title>{user.name}  (ID: {userID})</Card.Title>
                    <Card.Divider/>
                    <View>
                        <View style={{alignItems: 'center'}}>
                            <Image style={styles.image}
                                   source={require('../../assets/images/sacha.jpeg')}
                            />
                        </View>
                        <View style={styles.details_container}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                <Text>Age: {user.age}</Text>
                                <Text>Pokémon Favori: {user.favoritePokemon}</Text>
                            </View>
                        </View>
                        <Button title='Se Déconnecter' onPress={() => onSignOut()} color='#ffa07a'/>
                    </View>
                </Card>

            }
        </View>
    );
};


const styles = StyleSheet.create({
    image: {
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


export default ProfileView;
